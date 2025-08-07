import "./new-advert-page.css";
import { createAdvert } from "./service";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useState } from "react";

export default function NewAdvertPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: "",
    tags: [] as string[],
    photo: null as File | null,
  });

  const isFromDisabled =
    formData.name ||
    formData.price ||
    formData.sale ||
    formData.tags.length >= 0;

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("sale", formData.sale.toString());
      data.append("price", formData.price.toString());
      formData.tags.forEach((tag) => data.append("tags", tag));
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      const createdAdvert = await createAdvert(data);
      console.log(createdAdvert);
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          navigate("/login", { replace: true });
        } else {
          console.error("No se pudo crear...", error);
        }
      }
    }
  };

  return (
    <Page title="">
      <div className="mx-auto mt-16 max-w-2xl px-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-12 rounded-2xl bg-white p-8 shadow-lg"
        >
          <div className="space-y-12">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Advert Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                      <span>Photo (optional)</span>
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </label>
                  </div>
                  {formData.photo && (
                    <div className="photo-preview">
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Preview"
                        className="mt-4 max-w-xs rounded-lg border shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">
                Select SALE or BUY the product
              </legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-2">
                  <input
                    name="sale"
                    type="radio"
                    required
                    value="true"
                    checked={formData.sale === "true"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        sale: "true",
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="text-sm text-gray-700">Sale</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    name="sale"
                    type="radio"
                    required
                    value="false"
                    checked={formData.sale === "false"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        sale: "false",
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="text-sm text-gray-700">Buy</label>
                </div>
              </div>
            </fieldset>

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: event.target.value,
                    }))
                  }
                  className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">
                  Tags
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-2">
                    {["lifestyle", "motor", "mobile", "work"].map((tag) => (
                      <label key={tag} className="text-sm text-gray-700">
                        <input
                          type="checkbox"
                          name="tags"
                          value={tag}
                          checked={formData.tags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                </div>
              </fieldset>
            </div>

            <div>
              <Button
                title="Create!"
                disabled={!isFromDisabled}
                $variant="primary"
              >
                Create!
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Page>
  );

  /*
  return (
    <Page title="Create Advert">
      <div className="new-advert-page">
        <form onSubmit={handleSubmit} className="new-advert-page-form">

          <div className="form-label">
            <label className="form-field-label">
              <span>Foto (opcional)</span>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="form-field-input"
              />
            </label>
          </div>

          {formData.photo && (
            <div className="photo-preview">
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Preview"
                style={{ maxWidth: "200px", marginTop: "1rem" }}
              />
            </div>
          )}

          <div className="new-advert-page-textarea">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </div>

          <div className="new-advert-page-textarea">
            <label>
              <input
                name="sale"
                type="radio"
                required
                value="true"
                checked={formData.sale === "true"}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    sale: "true",
                  }))
                }
              />
              Sale
            </label>
            <label>
              <input
                name="sale"
                type="radio"
                required
                value="false"
                checked={formData.sale === "false"}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    sale: "false",
                  }))
                }
              />
              Buy
            </label>
          </div>

          <div className="new-advert-page-textarea">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, price: event.target.value }))
              }
            />
          </div>

          <div className="new-advert-page-textarea">
            <label>Tags</label>
            <div>
              {["lifestyle", "motor", "mobile", "work"].map((tag) => (
                <label key={tag}>
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag}
                    checked={formData.tags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Button
              title="Create!"
              disabled={!isFromDisabled}
              $variant="primary"
            >
              Create!
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
  */
}
