import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import './App.css'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

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
            <Input type="text" className='pl-10' placeholder="Search by title or author..." />
          </div>
          <div className=" max-w-md">
            <select id="example1" className="p-2  border focus:border-primary-300  focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
              <option value="">All Authors</option>
              <option value="">Option02</option>
              <option value="">Option03</option>
            </select>
          </div>

        </div>

        <hr className="my-3 h-px border-0 bg-gray-300" />

        <div className="lg:flex gap-6 my-4 items-center">
          <div className=" w-[250px] overflow-hidden rounded-lg bg-white shadow">
            <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" className="aspect-video w-full object-cover" alt="" />
            <div className="p-4">
              <p className="mb-1 text-sm text-primary-500">Authors Name • <time>18 Nov 2022</time></p>
              <h3 className="text-xl font-medium text-gray-900">Title of recipe</h3>
              <div className="mt-4 flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> follow </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> followers </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"> views </span>
              </div>
            </div>
          </div>
          <div className=" w-[250px] overflow-hidden rounded-lg bg-white shadow">
            <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" className="aspect-video w-full object-cover" alt="" />
            <div className="p-4">
              <p className="mb-1 text-sm text-primary-500">Authors Name • <time>18 Nov 2022</time></p>
              <h3 className="text-xl font-medium text-gray-900">Title of recipe</h3>
              <div className="mt-4 flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> follow </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> followers </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"> views </span>
              </div>
            </div>
          </div>
          <div className=" w-[250px] overflow-hidden rounded-lg bg-white shadow">
            <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" className="aspect-video w-full object-cover" alt="" />
            <div className="p-4">
              <p className="mb-1 text-sm text-primary-500">Authors Name • <time>18 Nov 2022</time></p>
              <h3 className="text-xl font-medium text-gray-900">Title of recipe</h3>
              <div className="mt-4 flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> follow </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> followers </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"> views </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
