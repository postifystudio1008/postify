const CATEGORY_IMAGES = {
    "Hot Beverages": "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=200&auto=format&fit=crop", // Latte art
    "Cold Coffee": "https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?q=80&w=200&auto=format&fit=crop", // Cold coffee
    "Mocktails": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200&auto=format&fit=crop", // Cocktail
    "Milk Shake": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=200&auto=format&fit=crop", // Milkshake
    "Thick Shake": "https://images.unsplash.com/photo-1579954115545-a95591f28bfd?q=80&w=200&auto=format&fit=crop", // Thick shake
    "Pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop", // Gourmet Pizza
    "Maggie & Pasta": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=200&auto=format&fit=crop", // Pasta
    "Unique Item": "https://images.unsplash.com/photo-1535268620699-00c645169a97?q=80&w=200&auto=format&fit=crop", // Cheese/Snack
    "Sandwich": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=200&auto=format&fit=crop", // Grilled Sandwich
    "Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop", // Juicy Burger
    "Cold Drink": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=200&auto=format&fit=crop", // Soft drink/Coke
    "French Fries": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=200&auto=format&fit=crop", // Fries
    "Garlic Bread": "https://images.unsplash.com/photo-1573140247632-f84660f67127?q=80&w=200&auto=format&fit=crop", // Garlic Bread
    "Combo": "https://images.unsplash.com/photo-1510629954389-c1e0da47d414?q=80&w=200&auto=format&fit=crop", // Meal combo
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=200&auto=format&fit=crop";

export const getCategoryImage = (category) => {
    return CATEGORY_IMAGES[category] || DEFAULT_IMAGE;
};
