import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [category, setCategory] = useState(''); // State for selected category
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev: { preventDefault: () => void; }) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    data.set('categories', category); // Include selected category
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return <>
    <form action="" onSubmit={createNewPost}>
      <div className="bg-textColor">
        <div className="flex justify-between gap-1 font-medium text-2xl items-center mb-6">
          <div>
            <h1>Create a new recipe</h1>
          </div>
          <div>
            <Button>Create</Button>
          </div>
        </div>
        <hr className="my-8 h-px border-0 bg-gray-300" />
        <div className="flex flex-col justify-center items-center">

          <div className="grid w-full max-w-2xl items-center gap-3 mb-3">
            <Label htmlFor="text">Title</Label>
            <Input type="text" id="text" placeholder="Recipe title"
            value={title}
            onChange={ev => setTitle(ev.target.value)} />
          </div>
          <div className="grid w-full max-w-2xl items-center gap-3 mb-3">
            <Label htmlFor="text">Description</Label>
            <Textarea placeholder="Type your description here." 
            value={summary}
            onChange={ev => setSummary(ev.target.value)}/>
          </div>
          <div className="grid w-full max-w-2xl items-center gap-3 mb-3">
            <Label htmlFor="text">Summary / Procedure</Label>
            <ReactQuill theme="snow" value={content} onChange={newValue => setContent(newValue)}
              className="mb-6 h-[250px] overflow-scroll border-gray-500"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="text">Provide a descriptive image for your recipe</Label>
            <Input id="picture" type="file"
              onChange={ev => setFiles(ev.target.files)} />
          </div>
        </div>
      </div>
    </form>

  </>;
}

export default Create;