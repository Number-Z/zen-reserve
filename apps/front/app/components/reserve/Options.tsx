import type { Option, OptionService } from "@prisma/client";
import { useFormContext } from "react-hook-form";

type OptionsProps = {
  options: (OptionService & {
    option: Option;
  })[];
};

export default function Options({ options }: OptionsProps) {
  const { register } = useFormContext();

  return (
    <section className="flex flex-col gap-6 px-6">
      <h2 className="font-bold text-gray-900 text-xl">オプション選択</h2>
      {options.map((option) => (
        <div key={option.optionId} className="w-full">
          {option.option.displayType === "select" ? (
            <>
              <label htmlFor={option.option.name}>
                <span className="text-sm">{option.option.printName}</span>
                <span className="float-right text-sm">
                  +{option.option.price}
                </span>
              </label>
              <select
                {...register(`options.${option.option.name}`)}
                id={option.option.name}
                className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
              >
                <option defaultValue="0">選択してください</option>
                {Array.from({ length: option.option.limit ?? 12 }, (_, i) => (
                  <option key={`${option.optionId}-${i}`} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </>
          ) : option.option.displayType === "checkbox" ? (
            <>
              <label
                htmlFor={option.option.name}
                className="inline-flex cursor-pointer items-center"
              >
                <input
                  id={option.option.name}
                  type="checkbox"
                  {...register(`options.${option.option.name}`)}
                  className="peer sr-only"
                />
                <div className="peer rtl:peer-checked:after:-translate-x-full relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300" />
                <span className="ms-3 font-medium text-gray-900 text-sm">
                  {option.option.printName}
                </span>
              </label>
              <span className="float-right text-sm">
                +{option.option.price}
              </span>
            </>
          ) : (
            <></>
          )}
          <p className="whitespace-pre-wrap text-slate-500 text-sm leading-8">
            {option.option.description}
          </p>
        </div>
      ))}
    </section>
  );
}
