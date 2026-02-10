import React from 'react';
import { Plus, Minus } from 'lucide-react';

const MenuItem = ({ item, count, onAdd, onRemove, image }) => {
    return (
        <div className="group bg-white rounded-xl p-3 shadow-sm hover:shadow-md border border-transparent hover:border-orange-accent/10 transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-4">
            {/* Thumbnail */}
            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden relative">
                <img
                    src={image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col justify-center">
                <h3 className="font-sans font-semibold text-coffee text-base leading-tight mb-1">
                    {item.name}
                </h3>
                <p className="text-orange-accent font-bold text-sm">
                    ₹{item.price}
                </p>
            </div>

            {/* Action */}
            <div className="flex-shrink-0">
                {count > 0 ? (
                    <div className="flex flex-col items-center gap-1 bg-coffee/5 rounded-full p-1">
                        <button
                            onClick={onRemove}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-coffee shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                            <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="text-xs font-bold text-coffee py-0.5">{count}</span>
                        <button
                            onClick={onAdd}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-coffee text-white shadow-md hover:bg-orange-accent transition-colors"
                        >
                            <Plus size={14} strokeWidth={3} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onAdd}
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-coffee rounded-full border border-gray-100 shadow-sm hover:bg-coffee hover:text-white hover:border-coffee transition-all duration-300"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MenuItem;
