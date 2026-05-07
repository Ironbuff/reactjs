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
import { useSetUserRole, useUserList } from "./actions/permission.action";
import { IUserListType } from "./interface/permission.interface";

const permissionSchema = z.object({
  role: z.string().optional(),
  user: z.string().optional(),
});

type PermissionStoreType = z.infer<typeof permissionSchema>;

const PermissionScreen = () => {
  const form = useForm<PermissionStoreType>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      role: "",
      user: "",
    },
  });

  const { data: userListData, isLoading: isUserListLoading } = useUserList();
  const { mutate } = useSetUserRole();

  const userListArray = userListData?.data?.users ?? ([] as IUserListType[]);

  const onSubmit = (data: PermissionStoreType) => {
    const userIdValue = data?.user;
    const role = data?.role;

    mutate({ userIdValue, role });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-200/70 rounded-3xl overflow-hidden">
          {/* Top Accent */}
          <div className="h-2 bg-gradient-to-r from-black via-slate-700 to-slate-400" />

          <div className="p-7 sm:p-8 space-y-7">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg shadow-black/20">
                <span className="text-xl font-semibold">P</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  User Permissions
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Assign a role to a selected user
                </p>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* User Field */}
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => {
                    const selectedUser = userListArray?.find(
                      (user: IUserListType) => user?._id === field.value,
                    );

                    return (
                      <FormItem className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                          User
                        </label>

                        <FormControl>
                          <Combobox
                            items={userListArray}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <ComboboxInput
                              placeholder={
                                isUserListLoading
                                  ? "Loading users..."
                                  : "Select user"
                              }
                              value={selectedUser?.username || ""}
                              readOnly
                              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-black focus:ring-4 focus:ring-black/10"
                            />

                            <ComboboxContent className="mt-2 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                              <ComboboxEmpty>No users found.</ComboboxEmpty>

                              {userListArray.map((item: IUserListType) => (
                                <ComboboxItem
                                  key={item?._id}
                                  value={item?._id}
                                  className="cursor-pointer px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100"
                                >
                                  {item?.username}
                                </ComboboxItem>
                              ))}
                            </ComboboxContent>
                          </Combobox>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                {/* Role Field */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => {
                    const selectedRole = userList.find(
                      (user) => user.value === field.value,
                    );

                    return (
                      <FormItem className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                          Role
                        </label>

                        <FormControl>
                          <Combobox
                            items={userList}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <ComboboxInput
                              placeholder="Select role"
                              value={selectedRole?.label || ""}
                              readOnly
                              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-black focus:ring-4 focus:ring-black/10"
                            />

                            <ComboboxContent className="mt-2 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                              <ComboboxEmpty>No roles found.</ComboboxEmpty>

                              {userList.map((item) => (
                                <ComboboxItem
                                  key={item.value}
                                  value={item.value}
                                  className="cursor-pointer px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100"
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
                  className="mt-2 h-11 w-full rounded-xl bg-black text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-slate-800 hover:shadow-xl active:scale-[0.98]"
                >
                  Save Permission
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionScreen;
