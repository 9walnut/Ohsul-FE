import React, { useState } from "react";
import styled from "styled-components";

import CheckboxGroup from "./CheckboxGroup";
import Checkbox from "./Checkbox";

// ✅ <TagBox checkedTags={DUMMYTags} disabled={true} />
// 상위 컴포넌트 사용 시 disabled={true} 전달하면 클릭 불가!
interface TagBoxProps {
  checkedTags?: { [key: string]: string[] };
  disabled?: boolean;
}
const TagBox: React.FC<TagBoxProps> = ({ checkedTags, disabled }) => {
  console.log(disabled);
  const defaultTag = {
    alcohol: ["alcohol_default"],
    music: ["music_default"],
    mood: ["mood_default"],
    etc: [],
    snack: [],
  };
  const [tags, setTags] = useState(checkedTags || defaultTag);

  const handleTagChange = (values: string[], tag: string) => {
    setTags((prevTags) => ({
      ...prevTags,
      [tag]: values,
    }));
    console.log({ [tag]: values });
  };

  return (
    <>
      <StyledGroupLayout>
        <CheckboxGroup
          label="술 선택"
          values={tags.alcohol}
          onChange={(values: string[]) => handleTagChange(values, "alcohol")}
          disabled={disabled}
        >
          <Checkbox id="alcohol_default" value="alcohol_default">
            술이면 다 돼요
          </Checkbox>
          <StyledColGroup>
            <Checkbox id="alcohol_1" value="alcohol_1" disabled={disabled}>
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
          values={tags.music}
          onChange={(values: string[]) => handleTagChange(values, "music")}
          disabled={disabled}
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
          values={tags.mood}
          onChange={(values: string[]) => handleTagChange(values, "mood")}
          disabled={disabled}
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
          values={tags.etc}
          onChange={(values: string[]) => handleTagChange(values, "etc")}
          disabled={disabled}
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
        <CheckboxGroup
          label="맛"
          values={tags.snack}
          onChange={(values: string[]) => handleTagChange(values, "snack")}
          disabled={disabled}
        >
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

const BasicStyle = `
display: flex;
justify-content: center;
`;

const StyledGroupLayout = styled.div`
  ${BasicStyle}
  align-items: center;
  margin: 20px;
`;

const StyledColGroup = styled.div`
  ${BasicStyle}
  flex-direction: row;
  gap: 2px;
`;
