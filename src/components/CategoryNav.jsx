import React from 'react';
import { motion } from 'framer-motion';

const CategoryNav = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-md border-b border-coffee/5 py-4 shadow-sm">
            <div className="flex overflow-x-auto px-6 gap-3 no-scrollbar pb-1">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`
              relative flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300
              ${activeCategory === category
                                ? 'text-white shadow-lg shadow-coffee/20'
                                : 'text-coffee bg-white border border-coffee/10 hover:border-orange-accent/50'}
            `}
                    >
                        {activeCategory === category && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute inset-0 bg-coffee rounded-full"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 tracking-wide">{category}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryNav;
