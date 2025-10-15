import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function SearchOverlay() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openSearch = () => setIsOpen(true);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally implement search functionality
    // For now we just log and close the overlay
    if (searchTerm.trim()) {
      onClose();
    }
  };

  // Mock suggested searches
  const suggestions = [
    "Gaming Mouse",
    "Mechanical Keyboard",
    "Gaming Headset",
    "RTX Graphics Cards",
  ];

  return (
    <Fragment>
      <button
        className="text-white hover:text-gaming-cyan transition-colors"
        onClick={openSearch}
        aria-label="Search"
      >
        <Search size={20} />
      </button>

      <div
        className={cn(
          "fixed inset-0 bg-gaming-darker/95 backdrop-blur-md z-50 transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="container mx-auto px-4 pt-24 h-full">
          <button
            className="absolute top-8 right-8 text-white hover:text-gaming-cyan transition-colors"
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={24} />
          </button>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-white text-2xl mb-6 font-bold">
              Search our store
            </h2>

            <form onSubmit={handleSubmit} className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-gaming-dark/60 border-gaming-cyan/30 text-white focus:border-gaming-cyan focus:ring-1 focus:ring-gaming-cyan rounded-lg"
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gaming-cyan/70"
                size={20}
              />
            </form>

            {isOpen && (
              <div className="mt-8 text-white">
                <h3 className="text-gaming-cyan mb-3 font-medium">
                  Popular Searches
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        className="w-full text-left py-2 px-3 rounded hover:bg-gaming-dark/60 transition-colors flex items-center"
                        onClick={() => {
                          setSearchTerm(suggestion);
                          inputRef.current?.focus();
                        }}
                      >
                        <Search
                          size={16}
                          className="mr-2 text-gaming-cyan/70"
                        />
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
