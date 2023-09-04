import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  return <>
    <div className="flex justify-between items-center">
      <h1 className="flex gap-1 text-xl font-medium items-center">Hello <span className="text-green-600">
        Username
      </span>

      </h1>
      <div className="h-10 w-10">
        <img className="h-full w-full rounded-full object-cover object-center" src="https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      </div>
    </div>


    <hr className="my-8 h-px border-0 bg-gray-300" />
    <div className="pt-4 flex justify-between items-center">
      <h1 className="text-lg font-medium">Welcome to your profile</h1>
      <div className="flex gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Edit Profile</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@name" className="col-span-3" />
              </div>
              <div className="grid w-full  items-center gap-3 mb-3">
                <Label htmlFor="text">Bio</Label>
                <Textarea placeholder="bio." />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="text">Update profile picture</Label>
                <Input id="picture" type="file" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button variant={'outline'} onClick={() => window.location.href = '/create'}>
          Create Recipe
        </Button>

      </div>
    </div>

    <hr className="my-8 h-px border-0 bg-gray-300" />


    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <h1 className="text-2xl font-medium m-3">Your Recipes</h1>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Date</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">State</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          <tr className="hover:bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td className="px-6 py-4">Nov.4 2022</td>
            <td className="px-6 py-4">helen@sailboatui.com</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                Paid
              </span>
            </td>
            <td className="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" className="text-primary-700">Edit</a></td>
          </tr>
          <tr className="hover:bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td className="px-6 py-4">Nov.4 2022</td>
            <td className="px-6 py-4">helen@sailboatui.com</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                Paid
              </span>
            </td>
            <td className="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" className="text-primary-700">Edit</a></td>
          </tr>
          <tr className="hover:bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td className="px-6 py-4">Nov.4 2022</td>
            <td className="px-6 py-4">helen@sailboatui.com</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
                Canceled
              </span>
            </td>
            <td className="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" className="text-primary-700">Edit</a></td>
          </tr>
          <tr className="hover:bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td className="px-6 py-4">Nov.4 2022</td>
            <td className="px-6 py-4">helen@sailboatui.com</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                Paid
              </span>
            </td>
            <td className="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" className="text-primary-700">Edit</a></td>
          </tr>
          <tr className="hover:bg-gray-50">
            <th className="px-6 py-4 font-medium text-gray-900">Helen Howard</th>
            <td className="px-6 py-4">Nov.4 2022</td>
            <td className="px-6 py-4">helen@sailboatui.com</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                Paid
              </span>
            </td>
            <td className="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">Delete</a><a href="" className="text-primary-700">Edit</a></td>
          </tr>
        </tbody>
      </table>
    </div>


  </>;
}

export default Profile;