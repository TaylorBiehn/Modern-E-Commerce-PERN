import React from "react";
import Link from "next/link";
import { topCat } from "@/app/data";

const Trends: React.FC = () => (
  <section className="w-[80%] min-w-[300px] h-auto gap-5 m-5 flex justify-center">
    <div className="flex overflow-x-auto gap-5 snap-x snap-proximity">
      {topCat.map((cat) => (
        <article
          key={cat.name}
          className="min-w-[300px] mb-2 min-h-[80px] rounded-[10px] border-[1px] flex justify-between items-center snap-center"
        >
          <div className="flex flex-row ml-2 items-center justify-center">
            <div className="p-[4px] rounded-[10px] bg-gray-100">
              <img
                className="w-[25px] h-[25px] m-[10px]"
                src={cat.imgLink}
                alt={cat.name}
                loading="lazy"
              />
            </div>
            <div className="ml-4">
              <p className="text-[14px] font-bold text-gray-800 tracking-[1px]">
                {cat.name}
              </p>
              <Link
                href={cat.showLink}
                className="text-[14px] font-semibold tracking-[0.5px] text-[#ff91a4]"
              >
                Show All
              </Link>
            </div>
          </div>
          <div className="h-[60%] mr-5">
            <p className="text-[12px] text-silver">({cat.quantity})</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Trends;