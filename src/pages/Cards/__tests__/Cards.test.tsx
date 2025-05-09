import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Cards from "../Cards";
import { QueryClient, QueryClientProvider } from "react-query";
import { CardDetails } from "../../../api/types";
import * as api from "../../../api";

const mockCardsData: CardDetails[] = [
  {
    name: "John Doe",
    cardNumber: "1234 5678 9012 3456",
    validThru: "12/25",
    cvv: "123",
    issuer: "Visa",
    isFrozen: false,
  },
  {
    name: "Jane Smith",
    cardNumber: "9876 5432 1098 7654",
    validThru: "10/26",
    cvv: "321",
    issuer: "Mastercard",
    isFrozen: true,
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for testing
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Cards Page", () => {
  beforeEach(() => {
    queryClient.clear(); // Clear cache before each test
    vi.spyOn(api.default, "getCards").mockResolvedValue([]); // Default to no cards
  });

  it("should show loading state initially", () => {
    vi.spyOn(api.default, "getCards").mockImplementation(
      () => new Promise(() => {})
    ); // Never resolves
    renderWithClient(<Cards />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show NoCardsView when no cards are available", async () => {
    vi.spyOn(api.default, "getCards").mockResolvedValue([]);
    renderWithClient(<Cards />);
    expect(await screen.findByText("No cards!")).toBeInTheDocument();
    expect(
      screen.getByText(/You don't have any cards yet/)
    ).toBeInTheDocument();
    expect(screen.queryByText(mockCardsData[0].name)).not.toBeInTheDocument();
  });

  it("should show card details and transactions when cards are available", async () => {
    vi.spyOn(api.default, "getCards").mockResolvedValue(mockCardsData);
    renderWithClient(<Cards />);

    // Verify card name is shown
    expect(await screen.findByText(mockCardsData[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockCardsData[1].name)).toBeInTheDocument();

    // Verify card details section
    const cardDetailsButton = screen.getByRole("button", {
      name: /Toggle card details/,
    });
    expect(cardDetailsButton).toBeInTheDocument();

    // Verify collapsible sections
    const cardDetailsCollapsible = screen.getByRole("button", {
      name: "Card details",
    });
    const transactionsCollapsible = screen.getByRole("button", {
      name: /Recent transactions/i,
    });
    expect(cardDetailsCollapsible).toBeInTheDocument();
    expect(transactionsCollapsible).toBeInTheDocument();

    // Verify no cards view is not shown
    expect(screen.queryByText("No cards!")).not.toBeInTheDocument();
  });

  it("should open AddCardModal when 'New Card' button is clicked", async () => {
    vi.spyOn(api.default, "getCards").mockResolvedValue([]);
    renderWithClient(<Cards />);
    await screen.findByText("No cards!"); // Wait for loading to finish
    await act(async () => {
      const newCardButton = screen.getByRole("button", {
        name: "Add new card",
      });
      fireEvent.click(newCardButton);
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Add card")).toBeInTheDocument();
  });

  it("should add a new card when filling and submitting the modal form", async () => {
    vi.spyOn(api.default, "getCards").mockResolvedValue([]);
    renderWithClient(<Cards />);
    await screen.findByText("No cards!");

    // Open modal
    await act(async () => {
      const newCardButton = screen.getByRole("button", {
        name: "Add new card",
      });
      fireEvent.click(newCardButton);
    });

    // Wait for modal to be fully visible
    await screen.findByRole("dialog");

    // Fill and submit form
    const form = screen.getByRole("form");
    const nameInput = screen.getByLabelText("Card Name");

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "New Test Card" } });
      fireEvent.submit(form);
    });

    // Wait for dialog to close and verify new card is added
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByText("New Test Card")).toBeInTheDocument();
  });

  it("should switch tabs when a tab is clicked", async () => {
    vi.spyOn(api.default, "getCards").mockResolvedValue(mockCardsData);
    renderWithClient(<Cards />);

    const tabs = await screen.findAllByRole("tab");
    const myCardsTab = tabs[0];
    const allCompanyCardsTab = tabs[1];

    expect(myCardsTab).toHaveAttribute("aria-selected", "true");
    expect(allCompanyCardsTab).toHaveAttribute("aria-selected", "false");

    fireEvent.click(allCompanyCardsTab);

    expect(myCardsTab).toHaveAttribute("aria-selected", "false");
    expect(allCompanyCardsTab).toHaveAttribute("aria-selected", "true");
  });
  it("should handle card freeze/unfreeze", async () => {
    vi.spyOn(api.default, "getCards").mockResolvedValue(mockCardsData);
    renderWithClient(<Cards />);
    await screen.findByText("John Doe");

    const freezeButton = screen.getByRole("button", { name: /freeze card/i });
    expect(freezeButton).toHaveTextContent("Freeze card");

    fireEvent.click(freezeButton);

    // Wait for button text to change and verify card state
    await waitFor(() => {
      expect(freezeButton).toHaveTextContent("Unfreeze card");
    });

    fireEvent.click(freezeButton);

    // Verify card returns to unfrozen state
    await waitFor(() => {
      expect(freezeButton).toHaveTextContent("Freeze card");
    });
  });

  it("should handle cancel card", async () => {
    vi.spyOn(api.default, "getCards").mockResolvedValue(mockCardsData);
    renderWithClient(<Cards />);

    // Find first card
    const firstCard = await screen.findByText("John Doe");
    expect(firstCard).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    // Open cancel dialog
    const cancelButton = screen.getByRole("button", { name: /cancel card/i });
    fireEvent.click(cancelButton);

    // Confirm in the modal
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: /cancel card!/i });
    fireEvent.click(confirmButton);

    // Verify card removal
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
