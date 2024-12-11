"use client";

import { Button } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
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
import LocationSelector from "@/components/ui/location-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  editFacility,
  getFacilities,
  getFacility,
} from "@/helpers/api/facilities";
import { useToast } from "@/hooks/useToast";
import { facilitiesSchema, FacilityFormData } from "@/types/facilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CloudUpload, Paperclip } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditFacility() {
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [files, setFiles] = useState<File[] | null>(null);

  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const facilityId = pathname.split("/").pop();

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const form = useForm<FacilityFormData>({
    resolver: zodResolver(facilitiesSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      country: ["", ""],
      email: "",
      phone_number: "",
      images: "",
      description: "",
      status: "inactive",
    },
  });

  const { setValue, handleSubmit, control, reset } = form;

  const { refetch: refetchFacilities } = useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
  });

  const { data: facility, refetch: refetchFacility } = useQuery({
    queryKey: ["facility", facilityId],
    queryFn: async () => await getFacility(facilityId as string),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FacilityFormData) =>
      await editFacility(String(facility?.id), values),
    onSuccess: () => {
      refetchFacilities();
      refetchFacility();
      router.push("/facilities");
      toast({
        title: "Success",
        description: "Facility edited successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const onSubmit = (values: FacilityFormData) => {
    mutate(values);
  };

  useEffect(() => {
    if (facility) {
      reset({
        name: facility.name,
        address: facility.address,
        city: facility.city,
        country: [facility.country, facility.state_province],
        email: facility.email,
        phone_number: facility.phone_number,
        images: "",
        description: facility.description,
        status: facility.status,
      });

      setCountryName(facility.country);
      setStateName(facility.state_province);
    }
  }, [facility, reset]);

  return (
    <Form {...form}>
      <form
        id="editFacilityForm"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <h1 className="text-3xl font-bold tracking-tight">Edit Facility</h1>

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facility Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Facility" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Toronto" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    setCountryName(country?.name || "");
                    setValue(field.name, [
                      country?.name || "",
                      stateName || "",
                    ]);
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || "");
                    setValue(field.name, [
                      countryName || "",
                      state?.name || "",
                    ]);
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                If your country has states, it will be appear after selecting
                country
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="acme@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="Placeholder"
                      {...field}
                      defaultCountry="CA"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
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
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your facility"
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
