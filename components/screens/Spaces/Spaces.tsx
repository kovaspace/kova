import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

const files = [
  {
    name: "Full court I",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1531124042451-f3ba1765072c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Full court II",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1731490862684-50c9a4180953?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Half court I",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1649706473901-69f5b7830241?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // More files...
];

export default function Spaces() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Spaces</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Space
        </Button>
      </div>

      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {files.map((file) => (
          <li key={file.source} className="relative">
            <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <Image
                alt="image"
                src={file.source}
                className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                width={512}
                height={512}
              />
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">View details for {file.name}</span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {file.name}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">
              {file.size}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}