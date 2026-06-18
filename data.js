const catalogData = {
  mattress: {
    label: "Mattress Collection",
    heading: "Choose mattress size",
    flow: ["size", "thickness", "firmness", "spring", "final"],
    products: {
      single: {
        name: "Single Mattress",
        dimension: "39” × 75”",
        image: "images/single-main.png",
        defaultThickness: "8 Inch",
        thickness: [
          { label: "6 Inch", price: "$150", image: "images/single-6.png" },
          { label: "8 Inch", price: "$180", image: "images/single-8.png" },
          { label: "10 Inch", price: "$200", image: "images/single-10.png" }
        ]
      },
      double: {
        name: "Double Mattress",
        dimension: "54” × 75”",
        image: "images/double-main.png",
        defaultThickness: "10–11 Inch",
        thickness: [
          { label: "8–9 Inch", price: "$230", image: "images/double-8-9.png" },
          { label: "10–11 Inch", price: "$250", image: "images/double-10-11.png" },
          { label: "12 Inch", price: "$300", image: "images/double-12.png" }
        ]
      },
      queen: {
        name: "Queen Mattress",
        dimension: "60” × 80”",
        image: "images/queen-main.png",
        defaultThickness: "10–11 Inch",
        thickness: [
          { label: "8–9 Inch", price: "$250", image: "images/queen-8-9.png" },
          { label: "10–11 Inch", price: "$270", image: "images/queen-10-11.png" },
          { label: "12 Inch", price: "$350", image: "images/queen-12.png" }
        ]
      },
      king: {
        name: "King Mattress",
        dimension: "76” × 80”",
        image: "images/king-main.png",
        defaultThickness: "10–11 Inch",
        thickness: [
          { label: "8–9 Inch", price: "$350", image: "images/king-8-9.png" },
          { label: "10–11 Inch", price: "$380", image: "images/king-10-11.png" },
          { label: "12 Inch", price: "$500", image: "images/king-12.png" }
        ]
      }
    }
  },

  bedframe: {
    label: "Bed Frame Collection",
    heading: "Choose bed frame size",
    flow: ["size", "color", "final"],
    products: {
      single: {
        name: "Single Bed Frame",
        dimension: "Single Size",
        price: "$220",
        image: "images/bedframe-single.png"
      },
      double: {
        name: "Double Bed Frame",
        dimension: "Double Size",
        price: "$240",
        image: "images/bedframe-double.png"
      },
      queen: {
        name: "Queen Bed Frame",
        dimension: "Queen Size",
        price: "$270",
        image: "images/bedframe-queen.png"
      },
      king: {
        name: "King Bed Frame",
        dimension: "King Size",
        price: "$400",
        image: "images/bedframe-king.png"
      }
    },
    colors: [
      { name: "Black", image: "images/bedframe-black.png" },
      { name: "Brown", image: "images/bedframe-brown.png" },
      { name: "White", image: "images/bedframe-white.png" },
      { name: "Grey", image: "images/bedframe-grey.png" }
    ]
  },

  boxspring: {
    label: "Box Spring Collection",
    heading: "Choose box spring size",
    flow: ["size", "final"],
    products: {
      single: {
        name: "Single Box Spring",
        dimension: "Single Size",
        thickness: "6 Inch",
        price: "$120",
        image: "images/boxspring-single.png"
      },
      double: {
        name: "Double Box Spring",
        dimension: "Double Size",
        thickness: "6 Inch",
        price: "$140",
        image: "images/boxspring-double.png"
      },
      queen: {
        name: "Queen Box Spring",
        dimension: "Queen Size",
        thickness: "6 Inch",
        price: "$160",
        image: "images/boxspring-queen.png"
      },
      king: {
        name: "King Box Spring",
        dimension: "King Size",
        thickness: "6 Inch",
        price: "$250",
        image: "images/boxspring-king.png"
      }
    }
  }
};

const firmnessOptions = [
  {
    name: "Soft Foam",
    desc: "A softer comfort feel for relaxed sleeping."
  },
  {
    name: "Semi-Firm",
    desc: "Balanced comfort and support for everyday use."
  },
  {
    name: "Full-Firm",
    desc: "A firmer feel with stronger support."
  }
];

const springOptions = [
  {
    name: "Without Springs",
    desc: "Foam-only mattress construction."
  },
  {
    name: "With Springs",
    desc: "Spring inside with foam comfort layer."
  }
];