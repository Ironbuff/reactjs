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

const PermissionScreen = () => {
  return (
    <div className="flex flex-col gap-y-4 px-7 py-4">
      <h1 className="text-xl font-semibold ">Select Permission For Different Users:</h1>
      <Combobox items={userList} >
        <ComboboxInput placeholder="Select a framework" className={'w-[800px]'} />
        <ComboboxContent className={'hidden'}>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          {userList.map((item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.id}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default PermissionScreen;
