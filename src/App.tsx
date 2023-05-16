import { useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { MdOutlineFileDownload } from "react-icons/md";
import { GrTwitter } from "react-icons/gr";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Meta {
  sourceUrl: string;
  title: string;
}

interface Url {
  quality: number;
  url: string;
}

interface Link {
  resourceId: string;
  urls: Url[];
  pictureUrl: string;
  meta: Meta;
}

function App() {
  const [url, setUrl] = useState<string>("");
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchVideo = async () => {
    setIsLoading(true);
    setLinks([]);
    const options = {
      method: "POST",
      url: "https://twitter65.p.rapidapi.com/api/twitter/links",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "e2e8732dcbmsh9fb102907cdb62ep17ad14jsn46f746729c89",
        "X-RapidAPI-Host": "twitter65.p.rapidapi.com",
      },
      data: {
        url: url,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setLinks(response.data);
      // setUrl("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const handleDownload = () => {
    if (url) {
      fetchVideo();
    } else {
      toast.error("Enter a URL!");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="">
        <div className="glass-card d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2 px-4 pt-4">
            <GrTwitter
              className="fs-5 text-primary"
              style={{ alignSelf: "center" }}
            />
            <h5 className="m-0 text-white">Twitter Video Downloader</h5>
          </div>
          <InputGroup className="px-4 pb-4">
            <Input
              placeholder="Enter a url..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              color="primary"
              className="fs-4 d-flex justify-content-center align-items-center"
              onClick={handleDownload}
            >
              {isLoading ? (
                <div className="rotate-loader"></div>
              ) : (
                <MdOutlineFileDownload />
              )}
            </Button>
          </InputGroup>
          {links.length > 0 && (
            <div className="border-top px-4 pt-2 pb-4">
              {links?.map((item) => (
                <div
                  key={item?.resourceId}
                  className="d-flex flex-column gap-2"
                >
                  <h6
                    className="text-white"
                    style={{ overflowWrap: "break-word" }}
                  >
                    {item?.meta?.title}
                  </h6>
                  <div className="d-flex align-items-center gap-4">
                    <img
                      src={item?.pictureUrl}
                      alt="video"
                      width={100}
                      height={100}
                      className="fade-in-ltr"
                    />
                    <div className="d-flex flex-column gap-2 fade-in-rtl">
                      {item.urls.map((item2, index) => (
                        <a
                          key={index}
                          href={item2.url}
                          className="d-flex align-items-center"
                        >
                          <MdOutlineFileDownload className="fs-5" />
                          <span className="text-white">{item2?.quality}p</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
