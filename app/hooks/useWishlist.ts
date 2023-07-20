import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface wishlistParams {
  productId: string;
  wishlistIds: string[];
}

const useWishlist = ({ productId, wishlistIds }: wishlistParams) => {
  const router = useRouter();
  
  const isWishlisted = wishlistIds.includes(productId)

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      try {
        let request;

        if (isWishlisted) {
          request = () => axios.delete(`api/wishlist/${productId}`);
        } else {
          request = () => axios.post(`api/wishlist/${productId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [isWishlisted, productId, router]
  );

  return {
    isWishlisted,
    toggleFavorite,
  };
};

export default useWishlist;
