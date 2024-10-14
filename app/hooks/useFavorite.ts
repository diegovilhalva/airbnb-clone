import { SafeUser } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import useLoginModel from "./useLoginModal";
import toast from "react-hot-toast";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

function useFavorite({ listingId, currentUser }: Props) {
  const router = useRouter();
  const loginModel = useLoginModel();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Sucesso!");
      } catch (error: any) {
        toast.error("Ocorreu um erro, tente novamente mais tarde!");
      }
    },
    [currentUser, hasFavorited, listingId, loginModel]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
}

export default useFavorite;