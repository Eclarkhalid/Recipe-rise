import { useEffect, useState } from 'react'
import Post from './components/post';

import './App.css'
import { Input } from './components/ui/input'

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Apply search and author filter here
    const filtered = posts
      .filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((post) => selectedAuthor === "" || post.author.username === selectedAuthor);

    setFilteredPosts(filtered);
  }, [searchQuery, selectedAuthor, posts]);

  // Categorize authors as "popular" or "new"
  const categorizedAuthors = posts.reduce((acc, post) => {
    if (post.author.username in acc) {
      acc[post.author.username].count++;
    } else {
      acc[post.author.username] = {
        count: 1,
        category: post.author.postCount > 1 ? "popular" : "new",
      };
    }
    return acc;
  }, {});

  return (
    <>
      <div className="bg-textColor">

        <div className="lg:flex justify-between p-4">
          <div className='lg:w-[400px] relative'>
            <div className="absolute inset-y-0 left-0 flex items-center px-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>

            </div>
            <Input type="text" className='pl-10' placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className=" max-w-md">
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              id="example1" className="p-2  border focus:border-primary-300  focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
              <option value="">All Authors</option>
              {Object.keys(categorizedAuthors).map((author) => (
                <option key={author} value={author} className="p-2 text-md">
                  {author} ({categorizedAuthors[author].category})
                </option>
              ))}
            </select>
          </div>

        </div>

        <hr className="my-3 h-px border-0 bg-gray-300" />

        

        {loading ? (
          <p className="text-center">Loading posts &#x1F604; ...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error fetching posts. Please try again later.</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center">No matching posts available.</p>
        ) : (
          <div className="lg:flex gap-6 my-4 items-center">
          {filteredPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}

        </div>
        )}

      </div>
    </>
  )
}

export default App
