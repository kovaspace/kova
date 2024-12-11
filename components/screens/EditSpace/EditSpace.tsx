"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getFacilities } from "@/helpers/api/facilities";
import { editSpace, getSpace, getSpaces } from "@/helpers/api/spaces";
import { useToast } from "@/hooks/useToast";
import { SpaceFormData, spaceSchema } from "@/types/spaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditSpace() {
  // const [files, setFiles] = useState<File[] | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const spaceId = pathname.split("/").pop();

  // const dropZoneConfig = {
  //   maxFiles: 5,
  //   maxSize: 1024 * 1024 * 4,
  //   multiple: true,
  // };

  const { data: facilities, isLoading } = useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
  });

  const { refetch: refetchSpaces } = useQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
  });

  const { data: space, refetch: refetchSpace } = useQuery({
    queryKey: ["space", spaceId],
    queryFn: async () => await getSpace(spaceId as string),
    enabled: !!spaceId,
  });

  const form = useForm<SpaceFormData>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: "",
      hourly_rate: 0,
      description: "",
      facilities_id: undefined,
      status: "inactive",
    },
  });

  const { handleSubmit, control, reset } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SpaceFormData) =>
      await editSpace(spaceId as string, values),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Space edited successfully",
      });
      refetchSpace();
      refetchSpaces();
      router.push("/spaces");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const onSubmit = (values: SpaceFormData) => {
    mutate(values);
  };

  useEffect(() => {
    if (space) {
      reset({
        name: space.name,
        hourly_rate: space.hourly_rate,
        description: space.description,
        facilities_id: space.facilities_id,
        status: space.status,
      });
    }
  }, [space, reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <h1 className="text-3xl font-bold tracking-tight">Edit Space</h1>

        <FormField
          control={control}
          name="facilities_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facility</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={space?.facilities_id}
                disabled={isLoading}
                {...field}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select facility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {facilities?.map((facilities) => (
                    <SelectItem key={facilities.id} value={facilities.id}>
                      {facilities.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the associated facility of this space
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full court, Photo studio, etc"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="hourly_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly rate</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload images</FormLabel>
              <FormControl>
                <FileUploader
                  {...field}
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Select a file to upload.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
                <FormDescription>
                  Setting your space to active will make this space accessible
                  to view to users
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value === "active" ? true : false}
                  onCheckedChange={(checked) => {
                    field.onChange(checked ? "active" : "inactive");
                  }}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
