'use client'
 import Image from "next/image"
 import { useRouter } from "next/navigation";

const SearchBar = () => {

      const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
  
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;

      if (name) {
            router.push(`/list?name=${name}`);
      }
    };

  return (
  <form className="flex min-w-0 max-w-sm flex-1 items-center justify-between gap-3 rounded-md bg-gray-100 p-2" onSubmit={handleSearch}>
    <input type="text"
     name="name" 
      placeholder="Search"
      className="min-w-0 flex-1 bg-transparent outline-none"/>
    <button type="submit" aria-label="Search products" className="shrink-0 cursor-pointer">
      <Image src='/search.png' alt="search"
        width={16}
        height={16}
      />
    </button>
   </form>
  )
}

export default SearchBar