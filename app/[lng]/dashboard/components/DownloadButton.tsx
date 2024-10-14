"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader } from "lucide-react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Loading from "./loading";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/app/i18n/client";
interface DownloadButtonProps {
  endpoint: string;
  title: string;
  lng: string;
}
const DownloadButton: React.FC<DownloadButtonProps> = ({
  endpoint,
  title,
  lng,
}) => {
  const { t } = useTranslation(lng, "translation");

  const axiosAuth = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await axiosAuth.get(endpoint + "?excel=1", {
        responseType: "blob",
        headers: {
          "Content-Type": "application/vnd.ms-excel",
          Accept: "application/vnd.ms-excel",
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error downloading the file",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={"outline"}
      className="p-2"
      onClick={handleDownload}
    >
      {loading ? (
        <Loader className="animate-spin transition-shadow" />
      ) : (
        <Download strokeWidth={1.25} />
      )}
    </Button>
  );
};

export default DownloadButton;
