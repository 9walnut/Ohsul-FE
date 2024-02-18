import React, { useState } from "react";
import styled from "styled-components";

import CheckboxGroup from "./CheckboxGroup";
import Checkbox from "./Checkbox";

const TagBox = () => {
  const [alcohol, setAlcohol] = useState<any>(["alcohol_default"]);
  const [music, setMusic] = useState<any>(["music_default"]);
  const [mood, setMood] = useState<any>(["mood_default"]);
  const [etc, setEtc] = useState<any>([]);
  const [snack, setSnack] = useState<any>([]);

  const handleAlcoholChange = (values: string[]) => {
    setAlcohol(values);
    console.log({ 술: values });
  };
  const handleMusicChange = (values: string[]) => {
    setMusic(values);
    console.log({ 음악: values });
  };
  const handleMoodChange = (values: string[]) => {
    setMood(values);
    console.log({ 분위기: values });
  };
  const handleEtcChange = (values: string[]) => {
    setEtc(values);
    console.log({ 기타: values });
  };
  const handleSnackChange = (values: string[]) => {
    setSnack(values);
    console.log({ 맛: values });
  };
  return (
    <>
      <StyledGroupLayout>
        <CheckboxGroup
          label="술 선택"
          values={alcohol}
          onChange={handleAlcoholChange}
        >
          <Checkbox id="alcohol_default" value="alcohol_default">
            술이면 다 돼요
          </Checkbox>
          <StyledColGroup>
            <Checkbox id="alcohol_1" value="alcohol_1">
              소주 / 맥주
            </Checkbox>
            <Checkbox id="alcohol_2" value="alcohol_2">
              해외맥주 / 생맥주
            </Checkbox>
            <Checkbox id="alcohol_3" value="alcohol_3">
              칵테일
            </Checkbox>
          </StyledColGroup>
          <StyledColGroup>
            <Checkbox id="alcohol_4" value="alcohol_4">
              막걸리 / 전통주
            </Checkbox>
            <Checkbox id="alcohol_5" value="alcohol_5">
              와인
            </Checkbox>
            <Checkbox id="alcohol_6" value="alcohol_6">
              양주
            </Checkbox>
            <Checkbox id="alcohol_7" value="alcohol_7">
              고량주
            </Checkbox>
          </StyledColGroup>
          <StyledColGroup>
            <Checkbox id="alcohol_8" value="alcohol_8">
              사케 / 하이볼
            </Checkbox>
            <Checkbox id="alcohol_9" value="alcohol_9">
              이색 술
            </Checkbox>
          </StyledColGroup>
        </CheckboxGroup>
      </StyledGroupLayout>

      <StyledGroupLayout>
        <CheckboxGroup
          label="음악 선택"
          values={music}
          onChange={handleMusicChange}
        >
          <Checkbox id="music_default" value="music_default">
            상관없어요
          </Checkbox>
          <StyledColGroup>
            <Checkbox id="music_1" value="music_1">
              댄스 / 아이돌
            </Checkbox>
            <Checkbox id="music_2" value="music_2">
              발라드 / R&B
            </Checkbox>
            <Checkbox id="music_3" value="music_3">
              힙합
            </Checkbox>
            <Checkbox id="music_4" value="music_4">
              EDM
            </Checkbox>
          </StyledColGroup>
          <StyledColGroup>
            <Checkbox id="music_5" value="music_5">
              재즈 / /클래식
            </Checkbox>
            <Checkbox id="music_6" value="music_6">
              7080 / 올드팝
            </Checkbox>
            <Checkbox id="music_7" value="music_7">
              그때그때 달라요
            </Checkbox>
          </StyledColGroup>
        </CheckboxGroup>
      </StyledGroupLayout>
      <StyledGroupLayout>
        <CheckboxGroup
          label="분위기 선택"
          values={mood}
          onChange={handleMoodChange}
        >
          <Checkbox id="mood_default" value="mood_default">
            상관없어요
          </Checkbox>
          <StyledColGroup>
            <Checkbox id="mood_1" value="mood_1">
              혼술 가능한
            </Checkbox>
            <Checkbox id="mood_2" value="mood_2">
              이야기 나누기 적당한
            </Checkbox>
          </StyledColGroup>
          <StyledColGroup>
            <Checkbox id="mood_3" value="mood_3">
              프라이빗한
            </Checkbox>
            <Checkbox id="mood_4" value="mood_4">
              다같이 즐기는
            </Checkbox>
            <Checkbox id="mood_5" value="mood_5">
              감성적인
            </Checkbox>
            <Checkbox id="mood_6" value="mood_6">
              힙한
            </Checkbox>
          </StyledColGroup>
        </CheckboxGroup>
      </StyledGroupLayout>
      <StyledGroupLayout>
        <CheckboxGroup
          label="기타 선택"
          values={etc}
          onChange={handleEtcChange}
        >
          <StyledColGroup>
            <Checkbox id="etc_1" value="etc_1">
              주차장 있어요
            </Checkbox>
            <Checkbox id="etc_2" value="etc_2">
              화장실 안에 있어요
            </Checkbox>
          </StyledColGroup>
        </CheckboxGroup>
      </StyledGroupLayout>
      <StyledGroupLayout>
        <CheckboxGroup label="맛" values={snack} onChange={handleSnackChange}>
          <StyledColGroup>
            <Checkbox id="snack_1" value="snack_1">
              안주 맛집 인정
            </Checkbox>
            <Checkbox id="snack_2" value="snack_2">
              평범해요
            </Checkbox>
          </StyledColGroup>
        </CheckboxGroup>
      </StyledGroupLayout>
    </>
  );
};

export default TagBox;

const StyledGroupLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const StyledColGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
`;
