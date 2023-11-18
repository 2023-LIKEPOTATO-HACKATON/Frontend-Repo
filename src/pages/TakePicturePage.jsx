import styled from "styled-components";
import {  useRef ,useState } from 'react';
import HeaderTitle from "../components/HeaderTitle.jsx";
import { useNavigate } from "react-router-dom";

import SimpleBar from "simplebar-react";

const Container = styled(SimpleBar)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh) * 100);
  overflow: auto;

  &.freeze > .simplebar-track {
    display: none;
  }

  & .simplebar-content {
    min-height: calc(var(--vh) * 100);
    display: flex;
    flex-direction: column;
  }

  & > .simplebar-track.simplebar-horizontal {
    height: 7px;
  }

  & > .simplebar-track.simplebar-vertical {
    width: 7px;
  }

  & .simplebar-mask {
    z-index: auto;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const BottomBox = styled.button`
  padding: 24px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #589E5B;
  color: white;
  text-align: center;
  cursor: pointer;
  font-weight:800;

  transition: opacity 0.2s;
`;

const VideoUploadBox = styled.div`
  margin: 20px;
  width: 350px;
  height: 350px;
  background-color: #F6F4F2;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-left: 40px;
  cursor: pointer;
`;

const UploadGuide = styled.div`
  background-color: #589E5B;
  margin-left: 40px;
  width: 350px;
  color: #FFFFFF;
  text-align: center;
  padding: 15px 0;
  font-size: 12px;
  font-weight: 300;
  margin-top: -50px;
  border-radius: 0 0 10px 10px;

  & > p:first-child {
    font-size: 14px;
    font-weight: 800;
    margin: 0;
    padding-bottom: 5px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const VideoPreview = styled.video`
  width: 100%;
  height: 400px;
  margin-top: -110px;
`;

function TakePicturePage() {
  const [videoSrc, setVideoSrc] = useState('');
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    navigate('/compeleteupload');
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <HeaderTitle to="/userProfile" title="분리배출 인증하기" />
      <VideoUploadBox onClick={handleClick}>
        {videoSrc ? (
          <VideoPreview src={videoSrc} controls />
        ) : (
          "영상을 업로드하세요"
        )}
        <HiddenFileInput type="file" accept="video/*" onChange={handleVideoChange} ref={fileInputRef} />
      </VideoUploadBox>
      <UploadGuide>
        <p>영상 업로드</p>
        <p>권장크기: 50MB 이하의 mp4, MOV, WMV, AVI, MKV만 가능</p>
      </UploadGuide>
      <Spacer />
      <BottomBox onClick={handleUploadClick}>업로드하기</BottomBox>
    </Container>
  );
}

export default TakePicturePage;