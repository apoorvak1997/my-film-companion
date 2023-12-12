# README for Assumptions and Decisions on the Assessment

## Assumptions Decision Summary

1. **Fetch Mechanism:**
   - *Assumption:* On page load, the app should fetch from the first page of the /popular TMDB API
   - *Considerations:* 
     - **Approach 1:** Pagination by making requests for each page individually
      ```jsx
      // to maintain page number in localStorage
      const [currentPageNumber, setCurrentPageNumber] = useState(1); 

      // fetch individually
      const fetchMovies = async(pageNumber) => {
         const res = await fetch(`${POPULAR_MOVIES_ENDPOINT}?api_key=${API_KEY}&language=${LANGUAGE}&page=${pageNumber}`);
        // ...
       }

      useEffect(() => {
        fetchMovies(currentPageNumber);
      }, [currentPageNumber]);
      ```
      - **Approach 1 Limitations:**
        - When users mark favorites on one page and navigate to another, the favorites are displayed based on currently fetched data, and may not display previously remembered favorites.
        - Passing the entire movie data instead of movie ids to the localStorage could be inefficient for large datasets.
        - Fetching per page may result in duplicated data across pages when navigating back and forth.
        - Accurate state updates and synchronization can be complex.

     - **Approach 2:** Getting all movie results
      ```jsx
      // to maintain page number in localStorage
      const [currentPageNumber, setCurrentPageNumber] = useState(1); 

      // fetch individually and collect in a single state
      const fetchMovies = async(pageNumber) => {
         const res = await fetch(`${POPULAR_MOVIES_ENDPOINT}?api_key=${API_KEY}&language=${LANGUAGE}&page=${pageNumber}`);
        // ...
       }

      useEffect(() => {
        for(let i=0; i < pageCount; i++){
          fetchMovies(currentPageNumber);
        }
      }, []);
      ```
      - **Approach 2 Limitations:**
        - Reduced efficiency for large datasets due to combining and breaking to components.
        - Defeats the purpose of pagination and fetching only when required.
    
   - **In Summary:**
     - Server-side pagination would be more efficient, reduce network overhead, and improve scalability for large datasets.
     - The need for pagination was not explicitly outlined.

## Conclusion

The design and decisions are made with the intention of preserving the essence of pagination, ensuring efficiency in local storage usage, and providing a user-friendly experience by reflecting their preferences on a per-page basis. The chosen approach aligns with the goal of implementing a simple create-react-app to fetch popular movies while considering potential alternatives and their implications.
