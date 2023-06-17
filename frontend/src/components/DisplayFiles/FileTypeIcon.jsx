import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegFileAudio, FaRegFileVideo, } from 'react-icons/fa';
import { BsFilePdf, BsFileEarmarkImage, BsFileEarmarkText, BsFileEarmarkMedical } from "react-icons/bs"

export default function FileTypeIcon({ fileType, fileId }) {
    const renderFileIcon = () => {
        if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' || fileType === 'gif') {
            return <BsFileEarmarkImage size="100px" />;
        } else if (fileType === 'mp4' || fileType === 'avi' || fileType === 'mov') {
            return <FaRegFileVideo size="100px" />;
        } else if (fileType === 'pdf') {
            return <BsFilePdf size="100px" />;
        } else if (fileType === 'txt') {
            return <BsFileEarmarkText size="100px" />;
        } else if (fileType === 'mp3' || fileType === 'wav') {
            return <FaRegFileAudio size="100px" />;
        } else {
            return <BsFileEarmarkMedical size="100px" />;
        }
    };

    return (
        <>
            {renderFileIcon()}
        </>
    );
}
