import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const FloatingCart = ({ cart, total, onPlaceOrder, isValid, validationMessage }) => {
    if (total === 0) return null;

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 animate-slide-up">
                <div className="max-w-md mx-auto">

                    {!isValid && (
                        <div className="mb-3 text-center">
                            <span className="inline-block px-3 py-1 bg-red-50 text-red-500 text-xs font-bold rounded-full border border-red-100 animate-pulse">
                                {validationMessage}
                            </span>
                        </div>
                    )}

                    <button
                        onClick={onPlaceOrder}
                        disabled={!isValid}
                        className={`
              w-full relative overflow-hidden group flex items-center justify-between px-6 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform active:scale-[0.98]
              ${isValid
                                ? 'bg-coffee text-white hover:bg-orange-accent hover:shadow-orange-accent/40'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
            `}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <ShoppingBag size={20} />
                            </div>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] opacity-80 uppercase tracking-wider font-normal">Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>Place Order</span>
                            <ArrowRight size={20} className={`transition-transform duration-300 ${isValid ? 'group-hover:translate-x-1' : ''}`} />
                        </div>

                        {/* Shine effect */}
                        {isValid && (
                            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1s_infinite]" />
                        )}
                    </button>
                </div>
            </div>
            {/* Spacer to prevent content from being hidden behind cart */}
            <div className="h-32" />
        </>
    );
};

export default FloatingCart;
