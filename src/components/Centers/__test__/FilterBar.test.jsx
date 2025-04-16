import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../FilterBar";

describe("FilterBar", () => {
  const defaultProps = {
    filters: {
      search: "",
      location: "",
      courseType: [],
      sortBy: "rating",
      priceRange: [0, 1000],
      rating: 0,
    },
    setFilters: jest.fn(),
    setIsMapView: jest.fn(),
    isMapView: false,
  };

  test("renders search input", () => {
    render(<FilterBar {...defaultProps} />);
    expect(
      screen.getByLabelText("O‘quv markazlarni qidirish")
    ).toBeInTheDocument();
  });

  test("toggles map/list view", () => {
    render(<FilterBar {...defaultProps} />);
    const toggleButton = screen.getByLabelText("Xarita ko‘rinishiga o‘tish");
    fireEvent.click(toggleButton);
    expect(defaultProps.setIsMapView).toHaveBeenCalledWith(true);
  });

  test("updates search filter", async () => {
    render(<FilterBar {...defaultProps} />);
    const searchInput = screen.getByLabelText("O‘quv markazlarni qidirish");
    fireEvent.change(searchInput, { target: { value: "Tech" } });
    expect(defaultProps.setFilters).toHaveBeenCalled();
  });

  test("clears filters", () => {
    render(<FilterBar {...defaultProps} />);
    const clearButton = screen.getByLabelText("Barcha filtrlarni tozalash");
    fireEvent.click(clearButton);
    expect(defaultProps.setFilters).toHaveBeenCalledWith({
      search: "",
      location: "",
      courseType: [],
      sortBy: "rating",
      priceRange: [0, 1000],
      rating: 0,
    });
  });

  test("renders price range slider correctly", () => {
    render(<FilterBar {...defaultProps} />);
    expect(
      screen.getByText(/Narx diapazoni: \$0 - \$1000/)
    ).toBeInTheDocument();
  });

  test("handles undefined priceRange gracefully", () => {
    const propsWithUndefined = {
      ...defaultProps,
      filters: { ...defaultProps.filters, priceRange: undefined },
    };
    render(<FilterBar {...propsWithUndefined} />);
    expect(
      screen.getByText(/Narx diapazoni: \$0 - \$1000/)
    ).toBeInTheDocument();
  });

  test("toggles course type filter", () => {
    render(<FilterBar {...defaultProps} />);
    const courseTypeLabel = screen.getByText("Kurs turlarini tanlash");
    fireEvent.click(courseTypeLabel);
    const itCheckbox = screen.getByText("IT").closest("label");
    fireEvent.click(itCheckbox);
    expect(defaultProps.setFilters).toHaveBeenCalled();
  });
});
