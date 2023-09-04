import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Create = () => {
  const [value, setValue] = useState('');
  return <>
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
          <Input type="text" id="text" placeholder="Recipe title" />
        </div>
        <div className="grid w-full max-w-2xl items-center gap-3 mb-3">
          <Label htmlFor="text">Description</Label>
          <Textarea placeholder="Type your description here." />
        </div>
        <div className="grid w-full max-w-2xl items-center gap-3 mb-3">
          <Label htmlFor="text">Summary / Procedure</Label>
          <ReactQuill theme="snow" value={value} onChange={setValue}
            className="mb-6 h-[250px] overflow-scroll border-gray-500"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="text">Provide a descriptive image for your recipe</Label>
          <Input id="picture" type="file" />
        </div>
      </div>
    </div>

  </>;
}

export default Create;