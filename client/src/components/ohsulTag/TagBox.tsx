import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

import CheckboxGroup from "./CheckboxGroup";
import Checkbox from "./Checkbox";
import { TagsState, SetTagsFunction } from "../../types/OhsulTag";

// ✅ <TagBox checkedTags={DUMMYTags} disabled={true} />
// 상위 컴포넌트 사용 시 disabled={true} 전달하면 클릭 불가!
interface TagBoxProps {
  tags?: TagsState;
  disabled?: boolean;
  setTags: SetTagsFunction;
  checkedTags?: { [key: string]: number[] };
  isToggle?: any;
}

const TagBox: React.FC<TagBoxProps> = ({
  tags,
  setTags,
  disabled,
  checkedTags,
  isToggle,
}) => {
  const handleTagChange = (values: number[], tag: string) => {
    setTags((prevTags) => ({
      ...prevTags,
      [tag]: values,
    }));
  };

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (isToggle == false) {
      setToggle(true);
    }
  });

  return toggle ? (
    <>
      {isToggle && (
        <TagToggle onClick={() => setToggle(!toggle)}>태그 숨기기 ▲</TagToggle>
      )}
      <StyledGroupLayout>
        <CheckboxGroup
          label="술 선택"
          values={tags!.alcoholTags}
          onChange={(values: number[]) =>
            handleTagChange(values, "alcoholTags")
          }
          disabled={disabled}
        >
          <StyledColGroup>
            <Checkbox id="alcohol_1" value={1} disabled={disabled}>
              소주 / 맥주
            </Checkbox>
            <Checkbox id="alcohol_2" value={2}>
              해외맥주 / 생맥주
            </Checkbox>
            <Checkbox id="alcohol_3" value={3}>
              칵테일
            </Checkbox>
          </StyledColGroup>
          <StyledColGroup>
            <Checkbox id="alcohol_4" value={4}>
              막걸리 / 전통주
            </Checkbox>
            <Checkbox id="alcohol_5" value={5}>
              와인
            </Checkbox>
            <Checkbox id="alcohol_6" value={6}>
              양주
            </Checkbox>
            <Checkbox id="alcohol_7" value={7}>
              고량주
            </Checkbox>
          </StyledColGroup>
          <StyledColGroup>
            <Checkbox id="alcohol_8" value={8}>
              사케 / 하이볼
            </Checkbox>
            <Checkbox id="alcohol_9" value={9}>
              이색 술
            </Checkbox>
          </StyledColGroup>
        </CheckboxGroup>
      </StyledGroupLayout>

      <StyledGroupLayout>
        <CheckboxGroup
          label="분위기 선택"
          values={tags!.moodTags}
          onChange={(values: number[]) => handleTagChange(values, "moodTags")}
          disabled={disabled}
        >
          <StyledColGroup>
            <Checkbox id="mood_1" value={1}>
              혼술 가능한
            </Checkbox>
            <Checkbox id="mood_2" value={2}>
              이야기 나누기 적당한
            </Checkbox>
          </StyledColGroup>
          <StyledColGroup>
            <Checkbox id="mood_3" value={3}>
              프라이빗한
            </Checkbox>
            <Checkbox id="mood_4" value={4}>
              다같이 즐기는
            </Checkbox>
            <Checkbox id="mood_5" value={5}>
              감성적인
            </Checkbox>
            <Checkbox id="mood_6" value={6}>
              힙한
            </Checkbox>
          </StyledColGroup>
        </CheckboxGroup>
      </StyledGroupLayout>
      <StyledGroupLayout>
        <CheckboxGroup
          label="음악 선택"
          values={tags!.musicTags}
          onChange={(values: number[]) => handleTagChange(values, "musicTags")}
          disabled={disabled}
        >
          <StyledColGroup>
            <Checkbox id="music_1" value={1}>
              댄스 / 아이돌
            </Checkbox>
            <Checkbox id="music_2" value={2}>
              발라드 / R&B
            </Checkbox>
            <Checkbox id="music_3" value={3}>
              힙합
            </Checkbox>
            <Checkbox id="music_4" value={4}>
              EDM
            </Checkbox>
          </StyledColGroup>
          <StyledColGroup>
            <Checkbox id="music_5" value={5}>
              재즈 / 클래식
            </Checkbox>
            <Checkbox id="music_6" value={6}>
              7080 / 올드팝
            </Checkbox>
            <Checkbox id="music_7" value={7}>
              그때그때 달라요
            </Checkbox>
          </StyledColGroup>
        </CheckboxGroup>
      </StyledGroupLayout>
    </>
  ) : (
    isToggle && (
      <TagToggle onClick={() => setToggle(!toggle)}>태그 검색 ▼</TagToggle>
    )
  );
};

export default TagBox;

const TagToggle = styled.div`
  font-family: ${({ theme }) => theme.fonts.ydFont};
  cursor: pointer;
`;

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
