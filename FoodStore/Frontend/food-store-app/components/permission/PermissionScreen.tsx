import React from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { userList } from "@/constants/FoodStoreConstant";
import { Controller, useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const permissionSchema = z.object({
role:z.string().optional(),
})

type permissionStoreType =  z.infer<typeof permissionSchema>

const permissionform = useForm({
  resolver:zodResolver(permissionSchema),
  defaultValues:{
    role:''
  }
})


  const onSubmit = (data:permissionStoreType) => {
    console.log("Submitted Data:", data);
  };

const PermissionScreen = () => {
  return (
    <div className="flex flex-col gap-y-4 px-7 py-4">
      <h1 className="text-xl font-semibold ">Select Permission For Different Users:</h1>
      <form onSubmit={permissionform.handleSubmit(onSubmit)}>
        <Controller
          control={permissionform.control}
          name="role"
          render={({ field }) => (
            <Combobox items={userList} value={field.value} onValueChange={field.onChange}>
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
          )}
        />

        <button
          type="submit"
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PermissionScreen;
