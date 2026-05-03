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

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useUserList } from "./actions/permission.action";
import { IUserListType } from "./interface/permission.interface";

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

  const {data:userListData , isLoading:isUserListLoading}= useUserList();
 
  const userListArray = userListData?.data?.users ?? [] as IUserListType;

  const onSubmit = (data: PermissionStoreType) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800">
            User Permissions
          </h1>
          <p className="text-sm text-gray-500">
            Select a role for the user
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => {
                const selectedUser = userList.find(
                  (user) => user.value === field.value
                );

                return (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        items={userList}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <ComboboxInput
                          placeholder="Select a user"
                          value={selectedUser?.label || ""}
                          readOnly
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                        />

                        <ComboboxContent className="rounded-lg shadow-md">
                          <ComboboxEmpty>No users found.</ComboboxEmpty>

                          {userList.map((item) => (
                            <ComboboxItem
                              key={item.value}
                              value={item.value}
                              className="hover:bg-gray-100 cursor-pointer"
                            >
                              {item.label}
                            </ComboboxItem>
                          ))}
                        </ComboboxContent>
                      </Combobox>
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition active:scale-[0.98]"
            >
              Save Permission
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PermissionScreen;