import Container from "@/components/Container" 
import Heading from "@/components/Heading"
import ListingCard from "@/components/Listings/ListingCard"
import { SafeUser,safeListing } from "../types"

interface FavoritesClientProps {
        listings:safeListing[]
        currentUser?:SafeUser | null
}
const FavoritesClient = ({listings,currentUser}:FavoritesClientProps) => {
  return (
    <Container>
        <Heading title="Favoritos" subtitle="lista dos seus lugares favoritos" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {listings.map((listing) => (
                <ListingCard 
                key={listing.id} 
                currentUser={currentUser}
                data={listing}
                 />
            ))}
        </div>
    </Container>
  )
}

export default FavoritesClient