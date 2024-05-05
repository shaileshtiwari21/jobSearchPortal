import { useEffect, useState } from "react";
import { useGetJobDetailsQuery } from "../redux/api";
import ButtonComp from "./components/Button";
import Paragraph from "./components/paraGraph";
import PrimaryHeader from "./components/PrimaryHeader";
import SecondaryHeading from "./components/SecondaryHeading";
import Spinner from "./components/Spinner";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import CardContent from "./components/cardContent";
function JobSearch() {
  const locationOption = [
    {
      label: "Remote",
      value: "Remote",
    },
    {
      label: "Hybrid",
      value: "Hybrid",
    },
    {
      label: "In-Office",
      value: "In-Office",
    },
  ];
  const [job, setJob] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchByCategory, setSearchByCategory] = useState([]);
  const [searchByExp, setSearchByExp] = useState([]);
  const [searchByLocation, setSearchByLocation] = useState([]);
  const [searchByMinSalery, setSearchByMinSalery] = useState([]);
  const [jobType, setJobType] = useState([]);
  console.log(searchByCategory);
  const { data, isSuccess, isLoading } = useGetJobDetailsQuery({
    limit: limit,
    offset: offset,
  });

  const fetchMoreData = () => {
    if (!isLoading) {
      setOffset((prevOffset) => prevOffset + 10);
      setLimit((prevOffset) => prevOffset + 10);
    }
  };

  // filter by categorys start
  const filteredColleges = Array.isArray(job)
    ? job.filter((college) => {
        const companyNameMatch = college?.companyName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        // search by role
        const roleMatch =
          searchByCategory.length === 0 ||
          searchByCategory.some((role) =>
            college?.jobRole?.toLowerCase().includes(role.toLowerCase())
          );
        // Search by experience
        const experienceMatch =
          searchByExp.length === 0 ||
          searchByExp.some((experience) => college?.minExp == experience);
        // search by location
        const locationMatch =
          searchByLocation.length === 0 ||
          searchByLocation.some((location) =>
            college?.location?.toLowerCase().includes(location.toLowerCase())
          );
        // search by salery
        const saleryMatch =
          searchByMinSalery.length === 0 ||
          searchByMinSalery.some((salery) => college?.minJdSalary == salery);

        // search by jobType
        const jobTypeMatch =
          jobType.length === 0 ||
          jobType.some((jType) =>
            college?.location?.toLowerCase().includes(jType.toLowerCase())
          );
        return (
          companyNameMatch &&
          roleMatch &&
          experienceMatch &&
          locationMatch &&
          saleryMatch &&
          jobTypeMatch
        );
      })
    : [];
  console.log(filteredColleges);

  // filter by categorys end

  useEffect(() => {
    if (isSuccess) {
      setJob(data?.jdList);
    }
  }, [isSuccess, data]);

  return (
    <>
      {/* filter */}

      <div className="sm:bg-white sm:sticky sm:top-0 sm:z-50 sm:pb-8 ">
        <PrimaryHeader className="font-normal py-4 text-center underline mt-4 ">
          Search Jobs
        </PrimaryHeader>
        {isLoading && <Spinner />}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-8 mx-1 sm:mx-0 ">
          <Select
            className="sm:min-w-[180px]"
            onChange={(selectedExperiences) => {
              const selectedExperienceValues = selectedExperiences.map(
                (experience) => experience.value
              );
              setSearchByExp(selectedExperienceValues);
            }}
            placeholder="Experience"
            isMulti
            options={[
              ...new Set(
                data?.jdList
                  ?.filter(
                    (item) => item.minExp !== null && item.minExp !== undefined
                  )
                  .map((item) => item.minExp)
              ),
            ].map((experience) => ({ value: experience, label: experience }))}
          />

          <Select
            className="sm:min-w-[180px]"
            onChange={(selectedLocations) => {
              const selectedLocationValues = selectedLocations.map(
                (location) => location.value
              );
              setSearchByLocation(selectedLocationValues);
            }}
            placeholder="Location"
            isMulti
            options={[
              ...new Set(
                data?.jdList
                  ?.filter(
                    (item) =>
                      item.location !== null && item.location !== undefined
                  )
                  .map((item) => item.location)
              ),
            ].map((location) => ({ value: location, label: location }))}
          />

          <Select
            className="sm:min-w-[180px]"
            placeholder="Role"
            onChange={(selectedRoles) => {
              const selectedRoleValues = selectedRoles.map(
                (role) => role.value
              );
              setSearchByCategory(selectedRoleValues);
            }}
            isMulti
            options={[
              ...new Set(
                data?.jdList
                  ?.filter(
                    (item) =>
                      item.jobRole !== null && item.jobRole !== undefined
                  )
                  .map((item) => item.jobRole)
              ),
            ].map((role) => ({ value: role, label: role }))}
          />

          <Select
            className="sm:min-w-[180px]"
            onChange={(selectedSalaries) => {
              const selectedSalaryValues = selectedSalaries.map(
                (salary) => salary.value
              );
              setSearchByMinSalery(selectedSalaryValues);
            }}
            placeholder="Min Salary"
            isMulti
            options={[
              ...new Set(
                data?.jdList
                  ?.filter(
                    (item) =>
                      item.minJdSalary !== null &&
                      item.minJdSalary !== undefined
                  )
                  .map((item) => item.minJdSalary)
              ),
            ].map((salary) => ({ value: salary, label: `${salary}L` }))}
          />

          <Select
            className="sm:min-w-[180px]"
            onChange={(jobType) => {
              const selectedJobTypeValues = jobType.map((type) => type.value);
              setJobType(selectedJobTypeValues);
            }}
            placeholder="Remote/on-site"
            isMulti
            options={locationOption}
          />
          <input
            onChange={(event) => setSearchTerm(event.target.value)}
            // setJobType
            type="text"
            className="border  px-2 py-2 xl:py-0  rounded-md outline-none border-gray-300 sm:w-[180px] w-full mx-8 sm:mx-0 "
            placeholder="Company"
          />
        </div>
      </div>
      {/* end  */}
      {filteredColleges && filteredColleges.length > 0 && (
        <>
          <InfiniteScroll
            dataLength={job.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h1 className="text-2xl py-8 text-center">Loading...</h1>}
            endMessage={<p>No more items to load</p>}
          >
            <div className="flex flex-wrap justify-center">
              {filteredColleges &&
                filteredColleges.map((item, index) => (
                  <>
                    <div
                      className="  p-8 bg-white border border-gray-200 rounded-3xl shadow-md sm:p-8 m-8   lg:w-1/4 "
                      key={index}
                    >
                      <div className="flex flex-col justify-between h-full ">
                        <div className="divide-y divide-gray-200 ">
                          <div className=" ">
                            <div className="flex justify-center items-start">
                              <div className="flex-shrink-0">
                                <img
                                  className="w-10 h-12 "
                                  src={item?.logoUrl}
                                  alt="Neil image"
                                />
                              </div>
                              <div className="flex-1 min-w-0 ms-4">
                                <Paragraph className="text-[14px]  truncate tracking-wider font-semibold text-[#8b8b8b] mb-[3px]">
                                  {item?.companyName}
                                </Paragraph>
                                <Paragraph className=" truncate pb-1">
                                  {item?.jobRole}
                                </Paragraph>
                                <Paragraph className="text-sm truncate mb-1 ">
                                  {item?.location} | Exp: {item?.minExp}{" "}
                                  {item?.maxExp ? "-" : ""}
                                  {item?.maxExp}{" "}
                                  {item?.minExp && item?.maxExp
                                    ? "years"
                                    : "0 year"}
                                </Paragraph>
                              </div>
                            </div>
                            <Paragraph className="truncate my-1">
                              Estimated Salary: ₹ {item?.minJdSalary}{" "}
                              {item?.minJdSalary ? "-" : ""} {item?.maxJdSalary}{" "}
                              LPA ✅
                            </Paragraph>

                            <PrimaryHeader className="font-normal pb-0">
                              About Company:
                            </PrimaryHeader>
                            <SecondaryHeading className="font-medium pt-0">
                              About us
                            </SecondaryHeading>
                            {/* card contents send as props  */}
                            <CardContent text={item?.jobDetailsFromCompany} />
                          </div>
                        </div>
                        <Paragraph className="text-[14px]  truncate tracking-wider font-semibold text-[#8b8b8b] mb-[3px] py-6">
                          {item?.minExp && "Minimum Experience "}
                          <Paragraph className=" truncate pb-1">
                            {item?.minExp} {item?.minExp && "years"}
                          </Paragraph>
                        </Paragraph>
                        <a href={item?.jdLink}>
                          <ButtonComp className="bg-[#55efc4] w-full py-2 mt-4">
                            Easy Apply
                          </ButtonComp>
                        </a>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </InfiniteScroll>
        </>
      )}
      {filteredColleges?.length === 0 && (
        <>
          <div className="flex justify-center items-center text-xl h-screen">
            No data found..
          </div>
        </>
      )}
    </>
  );
}

export default JobSearch;
