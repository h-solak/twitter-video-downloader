import { useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { MdOutlineFileDownload } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Url {
  quality: number;
  url: string;
}

interface Link {
  resourceId: string;
  urls: Url[];
  pictureUrl: string;
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
        <div className="glass-card p-4 d-flex flex-column gap-2">
          <h5 className="text-white">Twitter Video Downloader</h5>
          <InputGroup>
            <Input
              placeholder="Enter an url..."
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
          {links &&
            links?.map((item) => (
              <div key={item?.resourceId}>
                <img
                  src={item?.pictureUrl}
                  alt="video"
                  width={50}
                  height={50}
                />
                {item.urls.map((item2) => (
                  <a href={item2.url}>{item2?.quality}</a>
                ))}
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default App;
