import { useState, useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Home, Close } from "@mui/icons-material";
import "./Menu.css";

// Import images
import img1 from "../../assets/images/restaurent.jpg";
import img2 from "../../assets/images/special_bg.png";
import img3 from "../../assets/images/bg4.jpg";

gsap.registerPlugin(Flip);

interface ItemOption {
  label: string;
  price: string;
}

interface Item {
  id: number;
  category: string;
  className: string;
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  options?: ItemOption[];
}

const itemsData: Item[] = [
  {
    id: 1,
    category: "Blue",
    className: "gradient-blue",
    imageUrl: img1,
    title: "Blueberry Bliss",
    description:
      "A refreshing blend of fresh blueberries and organic yogurt with a honey glaze.",
    price: "$7.00",
    options: [
      { label: "SMALL", price: "$5.00" },
      { label: "LARGE", price: "$9.00" },
    ],
  },
  {
    id: 2,
    category: "Pink",
    className: "gradient-pink",
    imageUrl: img2,
    title: "Strawberry Dream",
    description:
      "Ripe strawberries topped with whipped cream on a vanilla bean shortcake base.",
    price: "$8.50",
  },
  {
    id: 3,
    category: "Purple",
    className: "gradient-purple",
    imageUrl: img3,
    title: "Lavender Sunset",
    description:
      "Lavender infusion with blackberry coulis and a hint of lemon zest.",
    price: "$9.00",
    options: [
      { label: "GLASS", price: "$9.00" },
      { label: "BOTTLE", price: "$32.00" },
    ],
  },
  {
    id: 4,
    category: "Pink",
    className: "gradient-pink",
    imageUrl: img2,
    title: "Rose Petal Tart",
    description: "Delicate rose petal syrup infused with lychee and hibiscus.",
    price: "$12.00",
  },
  {
    id: 5,
    category: "Blue",
    className: "gradient-blue",
    imageUrl: img1,
    title: "Arctic Blue",
    description:
      "Blue Curacao blended with coconut milk and served over crushed ice.",
    price: "$10.00",
  },
  {
    id: 6,
    category: "Purple",
    className: "gradient-purple",
    imageUrl: img3,
    title: "Midnight Violet",
    description:
      "Purple sweet potato cream with maple syrup and toasted coconut.",
    price: "$11.00",
  },
  {
    id: 7,
    category: "Blue",
    className: "gradient-blue",
    imageUrl: img1,
    title: "Deep Sea",
    description: "Blue spirulina with banana and oat milk for a healthy boost.",
    price: "$9.50",
  },
  {
    id: 8,
    category: "Purple",
    className: "gradient-purple",
    imageUrl: img3,
    title: "Royal Iris",
    description: "Purple carrot and apple juice with a touch of lemon balm.",
    price: "$8.00",
  },
];

const Menu = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const uniqueCategories = Array.from(
    new Set(
      itemsData.map((item) =>
        JSON.stringify({ category: item.category, className: item.className }),
      ),
    ),
  ).map((str) => JSON.parse(str));

  const [filters, setFilters] = useState<Record<string, boolean>>(() => {
    const initialFilters: Record<string, boolean> = {};
    uniqueCategories.forEach((cat) => {
      initialFilters[cat.category] = true;
    });
    return initialFilters;
  });

  const [layoutState, setLayoutState] = useState<Flip.FlipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allChecked = Object.values(filters).every(Boolean);

  const handleFilterChange = (category: string) => {
    const q = gsap.utils.selector(containerRef);
    const state = Flip.getState(q(".item-card"), {
      props: "opacity,transform",
      simple: true,
    });
    setLayoutState(state);

    setFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleAllChange = () => {
    const q = gsap.utils.selector(containerRef);
    const state = Flip.getState(q(".item-card"), {
      props: "opacity,transform",
      simple: true,
    });
    setLayoutState(state);

    const newValue = !allChecked;
    const newFilters: Record<string, boolean> = {};
    uniqueCategories.forEach((cat) => {
      newFilters[cat.category] = newValue;
    });
    setFilters(newFilters);
  };

  useEffect(() => {
    const q = gsap.utils.selector(containerRef);
    gsap.fromTo(
      q(".item-name"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.5,
      },
    );
  }, []);

  useLayoutEffect(() => {
    if (!layoutState) return;

    const q = gsap.utils.selector(containerRef);
    Flip.from(layoutState, {
      targets: q(".item-card"),
      duration: 0.7,
      scale: true,
      ease: "power1.inOut",
      stagger: 0.08,
      absolute: true,
      props: "opacity",
      onEnter: (elements: Element[]) => {
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 1 },
        );
        gsap.fromTo(
          elements.map((el: Element) => el.querySelector(".item-name")),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.3,
          },
        );
      },
      onLeave: (elements: Element[]) =>
        gsap.to(elements, { opacity: 0, scale: 0, duration: 1 }),
    });

    setLayoutState(null);
  }, [filters, layoutState]);

  const visibleItems = itemsData.filter((item) => filters[item.category]);
  const categoryItems = itemsData.filter(
    (item) => item.category === selectedCategory,
  );

  return (
    <div className="menu-wrapper">
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "fixed",
          top: { xs: "20px", md: "40px" },
          right: { xs: "20px", md: "40px" },
          bgcolor: "rgba(0, 255, 255, 0.1)",
          border: "2px solid rgba(0, 255, 255, 0.3)",
          color: "#00ffff",
          width: "40px",
          height: "40px",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 8px 32px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)",
          zIndex: 1001,
          "&:hover": {
            bgcolor: "rgba(0, 255, 255, 0.2)",
            transform: "scale(1.1)",
            boxShadow:
              "0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)",
          },
        }}
      >
        <Home />
      </IconButton>

      <div className="container" ref={containerRef}>
        <header className="menu-header">
          <h2>Our Menu</h2>
          <p className="menu-desc">
            Explore our colorful selection. Click a card to see the full
            category.
          </p>
        </header>
        <div className="buttons-container">
          <div className="checkboxes">
            <label className="tag-button" htmlFor="all">
              <input
                type="checkbox"
                id="all"
                checked={allChecked}
                onChange={handleAllChange}
              />
              All
              <span className="checked">All</span>
            </label>

            {uniqueCategories.map((cat) => (
              <label
                key={cat.category}
                className="tag-button"
                htmlFor={cat.category}
              >
                <input
                  type="checkbox"
                  id={cat.category}
                  className="filter"
                  checked={!!filters[cat.category]}
                  onChange={() => handleFilterChange(cat.category)}
                />
                {cat.category}
                <span className="checked">{cat.category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="box-container">
          {visibleItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="item-card"
              data-flip-id={`${item.id}-${idx}`}
              onClick={() => setSelectedCategory(item.category)}
            >
              <div className={`item ${item.className}`}>
                <img src={item.imageUrl} alt={item.category} />
              </div>
              <h3 className="item-name">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Redesigned Category Modal */}
      {selectedCategory && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCategory(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedCategory(null)}
              aria-label="Close modal"
            >
              <Close />
            </button>

            <div className="modal-header-section">
              <div className="modal-header-accent"></div>
              <h2 className="modal-category-title">{selectedCategory}</h2>
              <p className="modal-category-desc">
                <i>
                  Hand-crafted selections featuring our signature{" "}
                  {selectedCategory.toLowerCase()} flavors.
                </i>
              </p>
            </div>

            <div className="modal-items-grid">
              {categoryItems.map((item) => (
                <div key={item.id} className="item-detail-card">
                  <div className="item-detail-header">
                    <h3 className="item-detail-title">{item.title}</h3>
                    <span className="item-price-badge">{item.price}</span>
                  </div>
                  <p className="item-detail-desc">{item.description}</p>
                  {item.options && (
                    <div className="item-options-row">
                      {item.options.map((opt, i) => (
                        <div key={i} className="item-option-tag">
                          <span className="opt-label">{opt.label}</span>
                          <span className="opt-divider">|</span>
                          <span className="opt-price">{opt.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
