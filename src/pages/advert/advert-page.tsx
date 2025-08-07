import "./adverts-page.css";
import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect, useState } from "react";
import type { Advert } from "./types";
import { deleteAdvert, getAdvert } from "./service";
import { AxiosError } from "axios";
import Button from "../../components/ui/button";
import ConfirmModal from "../../components/ui/confirm-modal";

function AdvertPage() {
  const params = useParams();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    getAdvert(params.advertId)
      .then((advert) => setAdvert(advert))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            navigate("/404", { replace: true });
          }
        }
      });
  }, [params.advertId, navigate]);

  const handleDelete = async () => {
    if (!advert) return;

    try {
      await deleteAdvert(advert.id);
      navigate("/adverts");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          navigate("/login", { replace: true });
        } else {
          console.error("Ups! error...", error.message);
        }
      }
    }
  };

  return (
    <Page title="">
      <div className="mx-auto mt-16 mb-16 max-w-2xl px-4">
        <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
          <div className="flex justify-center">
            <img
              src={advert?.photo ? `${advert.photo}` : "/placeholder.png"}
              alt={advert?.name}
              className="max-w-xs rounded-xl"
            />
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          {params.advertId}
        </div>
        <br />
        <h2 className="text-center text-2xl font-semibold text-gray-900">
          {advert?.name}
        </h2>
        <br />
        <div className="text-center">
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              advert?.sale
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {advert?.sale ? "Sale" : "Buy"}
          </span>
        </div>
        <br />
        <p className="text-center text-lg font-medium text-gray-800">
          {advert?.price}€
        </p>
        <br />
        <div className="flex flex-wrap justify-center gap-2">
          {advert?.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            $variant="secondary"
            onClick={() => setShowConfirmDelete(true)}
            className="delete-button"
          >
            Delete Advert!
          </Button>
        </div>
        {showConfirmDelete && (
          <ConfirmModal
            message="Are you sure do you want to delete this advert?"
            onConfirm={() => {
              setShowConfirmDelete(false);
              handleDelete();
            }}
            onCancel={() => setShowConfirmDelete(false)}
          />
        )}
      </div>
    </Page>
  );
}

export default AdvertPage;
