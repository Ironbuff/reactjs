"use client";

import React from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "../ui/combobox";

import { userList } from "@/constants/FoodStoreConstant";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

const permissionSchema = z.object({
  role: z.string().optional(),
});

type PermissionStoreType = z.infer<typeof permissionSchema>;

const PermissionScreen = () => {
  const form = useForm<PermissionStoreType>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = (data: PermissionStoreType) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="flex flex-col gap-y-4 px-7 py-4 h-full w-full items-center justify-center">
      <h1 className="text-xl font-semibold">
        Select Permission For Different Users:
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-transparent shadow-md px-2 py-2 rounded-md"
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    items={userList}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ComboboxInput
                      placeholder="Select a user"
                      className="w-[400px]"
                    />

                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>

                      {userList.map((item) => (
                        <ComboboxItem key={item.value} value={item.value}>
                          {item.id}
                        </ComboboxItem>
                      ))}
                    </ComboboxContent>
                  </Combobox>
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
};

export default PermissionScreen;