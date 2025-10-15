import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC, Fragment, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetProducts } from "@/lib/superbase/products";

import { Label } from "@/components/ui/label";
import { homeProduct } from "@/lib/types/products";
interface SubCategoryProps {
  SubCategory: string[];
  filterd: string;
  Products: homeProduct[];
}
import ProductCard from "@/components/ui/ProductCard";
export const Header: FC<SubCategoryProps> =({ SubCategory, Products,filterd }) => {
 
  const [products, setProducts] = useState<homeProduct[]>(Products);
  const [searchTerm, setSearchTerm] = useState<string>(filterd);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 20; // Number of products per page
  // Calculate the indices for slicing the products array
    const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  // Fetch products based on pagination
  async function fetchProducts() {
    const products = await GetProducts(selectedCategory,totalPages, productsPerPage);
    setProducts(products);
  }
  useEffect(() => {   
     fetchProducts();
},[currentPage])
  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...Products];
    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.subcategory_path||''
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.subcategory_title === selectedCategory,
      );
      setProducts(filteredProducts);
      
    }
 // Apply category by Props
    if (filterd !== "") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.subcategory_title === filterd,
      );
      setProducts(filteredProducts);
      
    }
    // Apply price range filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "moins 2dt":
          filteredProducts = filteredProducts.filter(
            (product) => product.minprice < 2,
          );
          setProducts(filteredProducts);
          break;
        case "100to200":
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.minprice >= 100 && product.minprice <= 200,
          );
          break;
        case "over200":
          filteredProducts = filteredProducts.filter(
            (product) => product.minprice > 200,
          );
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "priceLow":
        filteredProducts.sort((a, b) => a.minprice - b.minprice);
        break;
      case "priceHigh":
        filteredProducts.sort((a, b) => b.minprice - a.minprice);
        break;
      case "newest":
        filteredProducts.sort((a, b) =>
          a.isnew === b.isnew ? 0 : a.isnew ? -1 : 1,
        );
        break;
      /*    case "popularity":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break; */
    }

  }, [searchTerm, sortBy, priceRange, selectedCategory, Products,filterd]);
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10 bg-gaming-dark border-gaming-cyan/30 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-gaming-dark border-gaming-cyan/30 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gaming-dark border-gaming-cyan/30 text-white">
                <SelectItem value="popularity">pertinence</SelectItem>
                <SelectItem value="priceLow">prix: croissant </SelectItem>
                <SelectItem value="priceHigh">prix: déscroissant </SelectItem>
                <SelectItem value="newest">nouveaux</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="border-gaming-cyan/30 text-white flex gap-2 h-16"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={32} />
            Trier par
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className="gaming-card p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="category" className="text-white mb-2 block">
              Category
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-gaming-dark border-gaming-cyan/30 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gaming-dark border-gaming-cyan/30 text-white">
                {SubCategory.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price" className="text-white mb-2 block">
              prix Range
            </Label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-gaming-dark border-gaming-cyan/30 text-white">
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent className="bg-gaming-dark border-gaming-cyan/30 text-white">
                <SelectItem value="all">tout</SelectItem>
                <SelectItem value="moins 2dt">moins 2TND</SelectItem>
                <SelectItem value="100to200">100 - 200TND</SelectItem>
                <SelectItem value="over200">plus 200TND</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {currentProducts.length > 0? (
       
        <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div key={product.product_id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      ) : (
        

         <div className="gaming-card p-10 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-400">
            {
              "Try adjusting your search or filters to find what you're looking for."
            }
          </p>
        </div>
      )}
       {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer text-white hover:bg-gaming-cyan/20'}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className={`cursor-pointer ${
                            currentPage === page 
                              ? 'bg-gaming-cyan text-gaming-dark border-gaming-cyan' 
                              : 'text-white hover:bg-gaming-cyan/20 border-gaming-cyan/30'
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer text-white hover:bg-gaming-cyan/20'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
    </Fragment>
  );
};
export default Header;
