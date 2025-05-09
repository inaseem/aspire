import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import DebitCard from "../DebitCard";

describe("DebitCard", () => {
  it("should show cvv if details are visible", () => {
    // Test implementation
    render(
      <DebitCard
        name="John Doe"
        cardNumber="1234 5678 9012 3456"
        validThru="12/34"
        cvv="123"
        issuer="Visa"
        isDetailsVisible={true}
        isFrozen={false}
      />
    );
    expect(screen.getByLabelText("Cardholder Name")).toHaveTextContent(
      "John Doe"
    );
    expect(screen.getByLabelText("Valid Thru")).toHaveTextContent("12/34");
    expect(screen.getByLabelText("CVV")).toHaveTextContent("123");
  });

  it("should not show cvv if details are not visible", () => {
    // Test implementation
    render(
      <DebitCard
        name="John Doe"
        cardNumber="1234 5678 9012 3456"
        validThru="12/34"
        cvv="123"
        issuer="Visa"
        isDetailsVisible={false}
        isFrozen={false}
      />
    );
    expect(screen.getByLabelText("Cardholder Name")).toHaveTextContent(
      "John Doe"
    );
    expect(screen.getByLabelText("Valid Thru")).toHaveTextContent("12/34");
    expect(screen.getByLabelText("CVV")).toHaveTextContent("***");
  });
});
