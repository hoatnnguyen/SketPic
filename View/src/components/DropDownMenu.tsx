import { FC, useState } from 'react';
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react";

interface DropDownMenuProps {
    converterSelection: (converter: string) => void;
    converterOptions: string[];
}

const DropDownMenu: FC<DropDownMenuProps> = ({
    converterSelection,
    converterOptions
}) => {
    const [selectConverter, setSelectConverter] = useState<string>("");

    const onClickHandler = (converter: string): void => {
        setSelectConverter(converter);
        converterSelection(converter);
    };

    return(
        <TEDropdown className="flex justify-center">
            <TERipple rippleColor="light">
                <TEDropdownToggle className="flex items-center whitespace-nowrap rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none">
                {selectConverter ? selectConverter : "Convert To"}
                <span className="ml-2 [&>svg]:w-5 w-2">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                    </svg>
                </span>
                </TEDropdownToggle>
            </TERipple>

            <TEDropdownMenu>
                {
                    converterOptions.map(
                        (converter: string, index: number) => (
                            <TEDropdownItem key={index} onClick={(): void => {
                                onClickHandler(converter);
                            }}>
                                    <div className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                                        {converter}
                                    </div>
                                    </TEDropdownItem>
                        )
                    )
                }
                {/* <TEDropdownItem>
                <div className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                    Sketch
                </div>
                </TEDropdownItem>
                <TEDropdownItem>
                <div className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600">
                    Anime
                </div>
                </TEDropdownItem> */}
            </TEDropdownMenu>
        </TEDropdown>
    )
};

export default DropDownMenu;
