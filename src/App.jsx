import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from './data/menuItems.js';
import Hero from './components/Hero.jsx';
import UserDetails from './components/UserDetails.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import MenuItem from './components/MenuItem.jsx';
import { getCategoryImage } from './utils/images.js';
import FloatingCart from './components/FloatingCart.jsx';

// Utility to flatten menu for easier access if needed, 
// though we iterate by category usually.
const ALL_CATEGORIES = Object.keys(MENU_ITEMS);

const App = () => {
    const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES[0]);
    const [userDetails, setUserDetails] = useState({ name: '', table: '' });
    const [cart, setCart] = useState({}); // { "Item Name": { ...item, quantity: 1 } }

    const addToCart = (item) => {
        setCart((prev) => {
            const existing = prev[item.name];
            if (existing) {
                return {
                    ...prev,
                    [item.name]: { ...existing, quantity: existing.quantity + 1 },
                };
            }
            return {
                ...prev,
                [item.name]: { ...item, quantity: 1 },
            };
        });
    };

    const removeFromCart = (itemName) => {
        setCart((prev) => {
            const existing = prev[itemName];
            if (!existing) return prev;

            if (existing.quantity === 1) {
                const newCart = { ...prev };
                delete newCart[itemName];
                return newCart;
            }

            return {
                ...prev,
                [itemName]: { ...existing, quantity: existing.quantity - 1 },
            };
        });
    };

    const totalAmount = useMemo(() => {
        return Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cart]);

    const validationState = useMemo(() => {
        if (!userDetails.name.trim()) return { valid: false, message: "Please enter your Name" };
        if (!userDetails.table) return { valid: false, message: "Please enter Table Number" };
        if (totalAmount < 250) return { valid: false, message: "Minimum order value is ₹250" };
        return { valid: true, message: "" };
    }, [userDetails, totalAmount]);

    const placeOrder = () => {
        if (!validationState.valid) return;

        const itemsList = Object.values(cart)
            .map(item => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`)
            .join('%0A'); // URL encoded newline

        const message = `New Order!%0AName: ${userDetails.name}%0ATable: ${userDetails.table}%0A%0AItems:%0A${itemsList}%0A%0ATotal: ₹${totalAmount}`;

        // WhatsApp URL
        window.location.href = `https://wa.me/919316676958?text=${message}`;
    };

    return (
        <div className="min-h-screen pb-24 bg-cream font-sans selection:bg-orange-accent/20">
            <Hero />
            <UserDetails userDetails={userDetails} setUserDetails={setUserDetails} />

            <CategoryNav
                categories={ALL_CATEGORIES}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <div className="px-6 mt-6 pb-24">
                <h2 className="text-2xl font-serif font-bold text-coffee mb-4 animate-slide-up sticky top-[72px] bg-cream/95 backdrop-blur-sm py-2 z-20">
                    {activeCategory}
                </h2>

                <div className="flex flex-col gap-4">
                    {MENU_ITEMS[activeCategory].map((item) => (
                        <MenuItem
                            key={item.name}
                            item={item}
                            count={cart[item.name]?.quantity || 0}
                            onAdd={() => addToCart(item)}
                            onRemove={() => removeFromCart(item.name)}
                            image={getCategoryImage(activeCategory)}
                        />
                    ))}
                </div>
            </div>

            <FloatingCart
                cart={cart}
                total={totalAmount}
                onPlaceOrder={placeOrder}
                isValid={validationState.valid}
                validationMessage={validationState.message}
            />
        </div>
    );
};

export default App;
