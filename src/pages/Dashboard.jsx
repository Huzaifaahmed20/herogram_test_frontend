import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "../lib/dropzone";
import { upload } from "../api/media";
import { toast } from "react-toastify";

const Dashboard = (props) => {
  const [mediaData, setMediaData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (files) => {
    try {
      setIsLoading(true);
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      const res = await upload(formData);
      const { path, type, name } = res.data.media;
      const data = [...mediaData];
      data.push({ name, path, type });
      setMediaData(data);
    } catch (error) {
      toast.error(error.response.data.error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      multiple: false,
      accept: {
        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        "video/*": [".mp4", ".mpeg", ".avi"],
        "application/pdf": [".pdf"],
      },
      onDropAccepted: onDrop,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const isImage = (type) => type.includes("image");
  const isVideo = (type) => type.includes("video");
  const isPdf = (type) => type.includes("pdf");

  const files = mediaData.map((file) => (
    <li key={file.path}>
      {isImage(file.type) && (
        <img height={200} width={200} src={file.path} alt={file.name} />
      )}
      {isVideo(file.type) && (
        <video height={200} width={200} src={file.path} controls></video>
      )}
      {isPdf(file.type) && <iframe src={file.path} title={file.name}></iframe>}
    </li>
  ));

  return (
    <section className="bg-white flex flex-col justify-center items-center h-screen space-y-10">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="text-xl text-black">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      {isLoading && <span className="loading loading-dots loading-lg"></span>}
      {mediaData.length > 0 && (
        <aside>
          <h4>Files</h4>
          <ul className="space-y-10">{files}</ul>
        </aside>
      )}
    </section>
  );
};

export default Dashboard;
