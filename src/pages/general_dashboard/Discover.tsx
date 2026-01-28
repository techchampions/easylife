import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/form/InputField";
import Button from "../../components/global/Button";
import { Search, SlidersHorizontal, UserRoundSearch, X } from "lucide-react";
import MatchCardList from "../../components/general_dating/MatchCardList";
import { useFilterUsers } from "../../hooks/query/useGetAllUsers";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";

const Discover: React.FC = () => {
  const [params, setParams] = useState<UserFilterParams>({
    page: 1,
  });
  const { data, isError, isLoading } = useFilterUsers(params);
  const initialValues = {
    query: "",
    minAge: 18,
    maxAge: 70,
    location: "",
  };
  const validationSchema = Yup.object().shape({
    // query: Yup.string().required("required"),
  });
  const [showFilterModal, setshowFilterModal] = useState(false);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-2xl my-4 w-[95%] md:w-full mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setParams({
              page: 1,
              keyword: values.query,
              min_age: String(values.minAge),
              max_age: String(values.maxAge),
              country: values.location,
            });
            setshowFilterModal(false);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                  Discover
                </h1>
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4 bg-secondary/20 p-2 rounded-2xl flex-1">
                    <InputField
                      name="query"
                      className="bg-white "
                      placeholder="Search by name..."
                    />
                    <button
                      type="submit"
                      className="flex items-center cursor-pointer justify-center bg-secondary/50 hover:bg-secondary text-white rounded-full p-2 w-fit h-fit"
                    >
                      <Search />
                    </button>
                  </div>
                  <div className="">
                    <div
                      className="bg-secondary/50 hover:bg-secondary cursor-pointer text-white p-4 rounded-lg flex items-center gap-2 h-full"
                      onClick={() => setshowFilterModal(true)}
                    >
                      <SlidersHorizontal /> <span>Filter</span>
                    </div>
                  </div>
                </div>
                {showFilterModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50">
                    <div className="bg-white relative w-sm max-w-sm md:max-w-sm p-8 rounded-2xl">
                      <button
                        className="absolute top-4 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
                        onClick={() => setshowFilterModal(false)}
                        aria-label="Close Modal"
                      >
                        <X size={24} />
                      </button>

                      <div className="space-y-2">
                        <div className="">
                          <div className="">Location</div>
                          <InputField
                            name="location"
                            placeholder="Enter Location"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="">
                            <div className="">min age</div>
                            <InputField name="minAge" />
                          </div>
                          <div className="">
                            <div className="">max age</div>
                            <InputField name="maxAge" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-10">
                        <Button
                          label="Cancel"
                          className="bg-zinc-700"
                          onClick={() => setshowFilterModal(false)}
                        />
                        <Button
                          label="Apply filters"
                          type="submit"
                          disabled={!isValid}
                          className="bg-secondary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="mt-10 px-4">
        {data && data?.result.data.length > 0 ? (
          <MatchCardList
            users={data?.result.data || []}
            isError={isError}
            isLoading={isLoading}
          />
        ) : (
          <ItemMessagePlaceholder
            title="No user found"
            message="Oops... no user matching your search."
            icon={<UserRoundSearch />}
          />
        )}
      </div>
    </div>
  );
};

export default Discover;
