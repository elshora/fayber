"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavComponent from "../../components/NavComponent";
import { useTranslation } from "@/app/i18n/client";
import { useAppSelector } from "@/lib/hooks";

export default function UserCard({
  lng,
  user,
}: {
  lng: string;
  user: ConvenantUser;
}) {
  const { t } = useTranslation(lng, "covenant");
  const covenant = useAppSelector((state) => state.covenant);
  return (
    <Card className="p-3 text-center bg-userCard">
      <CardContent>
        <div className="flex w-full justify-center mb-5 pt-5">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/assets/images/user.png" alt="user" />
            <AvatarFallback>{user.first_name}</AvatarFallback>
          </Avatar>
        </div>
        <h4 className="text-[16px] font-bold">{`${user.first_name} ${user.second_name}`}</h4>
        <div className="flex items-center justify-center my-2">
          <span className="me-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.4096 9.86069C20.3513 9.85788 20.2929 9.85688 20.2346 9.85769H17.7996C15.8076 9.85769 14.1016 11.4387 14.1016 13.5007C14.1016 15.5627 15.8076 17.1437 17.8006 17.1437H20.2336C20.2946 17.1437 20.3536 17.1437 20.4086 17.1397C20.8197 17.1134 21.2073 16.9386 21.4991 16.6477C21.7909 16.3568 21.967 15.9698 21.9946 15.5587C21.9986 15.4997 21.9986 15.4367 21.9986 15.3787V11.6227C21.9986 11.5647 21.9986 11.5017 21.9946 11.4427C21.967 11.0318 21.7911 10.6448 21.4995 10.354C21.2079 10.0631 20.8206 9.88818 20.4096 9.86169M17.5866 14.4727C18.0996 14.4727 18.5166 14.0387 18.5166 13.5017C18.5166 12.9647 18.0996 12.5307 17.5866 12.5307C17.0736 12.5307 16.6576 12.9647 16.6576 13.5017C16.6576 14.0387 17.0726 14.4727 17.5866 14.4727Z"
                fill="#124076"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.234 18.6C20.2675 18.5988 20.3008 18.6055 20.3312 18.6196C20.3617 18.6337 20.3884 18.6547 20.4092 18.6809C20.43 18.7072 20.4444 18.738 20.4511 18.7708C20.4579 18.8037 20.4568 18.8377 20.448 18.87C20.254 19.562 19.947 20.152 19.454 20.648C18.733 21.375 17.818 21.698 16.688 21.851C15.59 22 14.188 22 12.416 22H10.379C8.608 22 7.205 22 6.107 21.851C4.977 21.698 4.062 21.375 3.341 20.648C2.62 19.923 2.3 19 2.148 17.862C2 16.754 2 15.34 2 13.555V13.445C2 11.66 2 10.245 2.148 9.139C2.3 8 2.62 7.08 3.34 6.351C4.061 5.625 4.976 5.301 6.106 5.149C7.205 5 8.608 5 10.379 5H12.416C14.187 5 15.59 5 16.688 5.149C17.818 5.302 18.733 5.625 19.454 6.351C19.947 6.848 20.254 7.438 20.448 8.131C20.4566 8.16328 20.4575 8.19714 20.4507 8.22984C20.4439 8.26255 20.4295 8.2932 20.4087 8.31935C20.3879 8.3455 20.3613 8.36641 20.3309 8.38042C20.3006 8.39442 20.2674 8.40113 20.234 8.4H17.801C15.067 8.4 12.658 10.577 12.658 13.5C12.658 16.423 15.068 18.6 17.802 18.6H20.234ZM5.614 8.886C5.51879 8.88639 5.42459 8.90554 5.33678 8.94233C5.24897 8.97913 5.16927 9.03287 5.10222 9.10047C5.03518 9.16807 4.98211 9.24821 4.94604 9.33633C4.90997 9.42444 4.89161 9.51879 4.892 9.614C4.892 10.017 5.215 10.343 5.614 10.343H9.47C9.87 10.343 10.193 10.017 10.193 9.614C10.1935 9.42163 10.1177 9.2369 9.98213 9.10041C9.84657 8.96391 9.66237 8.88679 9.47 8.886H5.614Z"
                fill="#124076"
              />
              <path
                d="M7.77734 4.02459L9.73534 2.58159C10.2463 2.20385 10.8649 2 11.5003 2C12.1358 2 12.7544 2.20385 13.2653 2.58159L15.2343 4.03259C14.4103 4.00059 13.4903 4.00059 12.4833 4.00059H10.3133C9.39134 4.00059 8.54434 4.00059 7.77734 4.02459Z"
                fill="#124076"
              />
            </svg>
          </span>
          <p className="text-[14px] font-medium">
            {user?.covenant_details?.original_cash ?? 0} LE
          </p>
        </div>
      </CardContent>
      <CardFooter className="text-center p-0">
        <NavComponent
          target={`/dashboard/covenant/${user.id}`}
          title={t("Details")}
          classes="w-full justify-center bg-primary"
          // disabled={!user.covenant_details.original_cash ? true : false}
        />
      </CardFooter>
    </Card>
  );
}
