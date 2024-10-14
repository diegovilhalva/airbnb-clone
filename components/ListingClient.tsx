"use client";

import useLoginModel from "@/app/hooks/useLoginModal";
import { SafeUser, safeListing } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";



import Container from "./Container";
import ListingHead from "./Listings/ListingHead"
import ListingInfo from "./Listings/ListingInfo";

import { categories } from "./Navbar/Categories"
import { Reservation } from "@prisma/client";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  reservations?:Reservation[];
  listing: safeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

function ListingClient({ reservations = [], listing, currentUser }: Props) {
  const router = useRouter();
  const loginModal = useLoginModel();

 
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);


  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
             
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;