import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// import TextField from '@mui/material/TextField'

import Typography from '@mui/material/Typography'
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'
import { Color, ColorPicker, createColor } from 'material-ui-color'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'
import { InputAdornment, TextField } from '@mui/material'

// interface KeywordsProps {
//   indexNumber: number
//   keywords: any
//   setKeywords: any
//   handleKeyword: any
//   handleChangeLabel: any
//   removeKeyword: any
//   value: any
// }

export const GenerateRandomColor = () => {
  const randomColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')

  return randomColor as string
}

const randomHexColor = GenerateRandomColor()
const randomColorKeyword = GenerateRandomColor()

export const CheckKeywords = (keyword: string, keywordsValue: any) => {
  if (!keywordsValue || !keyword) return false

  const keywordTrim = keyword?.trim()

  if (keywordsValue?.length > 0) {
    for (let j = 0; j < keywordsValue?.length; j++) {
      if (keywordTrim === keywordsValue[j]?.name || keywordTrim === keywordsValue[j]?.label) {
        return true
      }

      const keywordAnd = keywordsValue[j]?.keyword_and
      const keywordOr = keywordsValue[j]?.keyword_or
      const keywordExclude = keywordsValue[j]?.keyword_exclude

      if (keywordAnd?.length > 0) {
        for (let i = 0; i < keywordAnd?.length; i++) {
          if (keywordAnd[i] === keywordTrim) {
            return true
          }
        }
      }

      if (keywordOr?.length > 0) {
        for (let i = 0; i < keywordOr?.length; i++) {
          if (keywordOr[i] === keywordTrim) {
            return true
          }
        }
      }

      if (keywordExclude?.length > 0) {
        for (let i = 0; i < keywordExclude?.length; i++) {
          if (keywordExclude[i] === keywordTrim) {
            return true
          }
        }
      }
    }
  }

  return false
}

const KeywordForm = (props: any) => {
  const {
    indexNumber,
    keywords,
    setKeywords,
    removeKeyword,
    value,
    setCheckKeyword,
    setCheckKeywordAnd,
    setCheckKeywordExclude,
    setCheckKeywordOr,
    keywordCount,
    setKeywordCount,
    keywordLimit
  } = props

  const {

    // keyword_and,
    // keyword_or,
    keyword_exclude,

    // keyword_or_color,
    // keyword_and_color,
    delete_keyword_and,
    delete_keyword_or,
    delete_keyword_exclude,

    // color_and
  } = value

  function handleChangeLabel(i: number, event: any) {
    const checkInputKeywords = CheckKeywords(event.target.value, keywords)
    setCheckKeyword(checkInputKeywords)

    const values = [...keywords]
    values[i].name = event.target.value
    setKeywords(values)
  }

  function handleChangeColor(event: any, i: number) {
    const values = [...keywords]
    values[i].colors = '#' + event.hex
    values[i].color = '#' + event.hex
    setKeywords(values)
  }

  function addMoreKeyword(i: number, list: any, current: any, type: any) {

    // keywords

    const newTextKeyword = [...list, '']

    const values = [...keywords]

    if (type === 'keyword_or') {

      // console.log(values, i, values[i])
      values[i].keyword_or = newTextKeyword

      // setKeywordCount(keywordCount + 1)

    }

    if (type === 'keyword_and') {
      values[i].keyword_and = [...list, '']

      // setKeywordCount(keywordCount + 1)

    }

    if (type === 'keyword_exclude') {
      values[i].keyword_exclude = [...list, '']
    }

    setKeywords(values)
  }

  function removeTextKeyword(i: number, indexValue: number, list: any, type: any) {
    const values = [...keywords]

    if (list[i] !== '' && type !== 'keyword_exclude') {
      setKeywordCount(keywordCount - 1)
    }
    const news = list.filter((item: any, index: number) => index !== i)
    const removed = list.filter((item: any, index: number) => index === i)

    if (type === 'keyword_or') {
      values[indexValue].keyword_or = news
      values[indexValue].delete_keyword_or = delete_keyword_or ? [...delete_keyword_or, removed[0]] : removed
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and = news
      values[indexValue].delete_keyword_and = delete_keyword_and ? [...delete_keyword_and, removed[0]] : removed

    // setKeywordCount(keywordCount - 1)
    }

    if (type === 'keyword_exclude') {
      values[indexValue].keyword_exclude = news
      values[indexValue].delete_keyword_exclude = delete_keyword_exclude
        ? [...delete_keyword_exclude, removed[0]]
        : removed
    }

    setKeywords(values)
  }

  const addMoreKeywordColors = (i: number, colorList: any, current: any, type: any) => {
    const values = [...keywords]

    if (type === 'keyword_or') {
      
      // console.log(values, i, values[i])
      const randomColor = GenerateRandomColor()
      const newKeywordColor = [...colorList, randomColor]
      values[i].keyword_or_color = newKeywordColor
    }

    if (type === 'keyword_and') {
      const randomColor = GenerateRandomColor()
      values[i].keyword_and_color = [...colorList, randomColor]
      values[i].color_and = randomColor
    }

    if (type === 'keyword_exclude') {
      values[i].keyword_exclude_color = [...colorList, '#700077']
    }

    setKeywords(values)
  }

  const removeKeywordColors = (i: number, indexValue: number, colorList: any, type: any) => {
    const values = [...keywords]

    if (type === 'keyword_or') {
      const news = colorList.filter((item: any, index: number) => index !== i)
      values[indexValue].keyword_or_color = news
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and_color = colorList
    }

    if (type === 'keyword_exclude') {
      values[indexValue].keyword_exclude_color = colorList
    }

    setKeywords(values)
  }

  function handleTextKeyword(i: number, e: any, list: any, current: any, type: any, indexValue: number) {
    let textKeywords

    if (!e.target.value && type !== 'keyword_exclude') {
      const keywordsCounting = keywordCount - 2
      setKeywordCount(keywordsCounting)
    }

    if (list.length <= 0) {
      textKeywords = [...list, e.target.value]
      const checkInputKeywords = CheckKeywords(e.target.value, keywords)

      // setCheckKeyword(checkInputKeywords)

      console.log('events', e.target.value, e.target.value.length)
      if (type === 'keyword_or') {
        setCheckKeywordOr(checkInputKeywords)
        if (e.target.value?.length === 1) {
          setKeywordCount(keywordCount + 1)
        }
      }

      if (type === 'keyword_and') {
        setCheckKeywordAnd(checkInputKeywords)
        if (e.target.value?.length === 1) {
          setKeywordCount(keywordCount + 1)
        }
      }

      if (type === 'keyword_exclude') {
        setCheckKeywordExclude(checkInputKeywords)
      }
    } else {
      textKeywords = [...list]
      textKeywords[i] = e.target.value
      const checkInputKeywords = CheckKeywords(e.target.value, keywords)

      // setCheckKeyword(checkInputKeywords)

      if (type === 'keyword_or') {
        setCheckKeywordOr(checkInputKeywords)
        if (e.target.value?.length === 1) {
          setKeywordCount(keywordCount + 1)
        }
      }

      if (type === 'keyword_and') {
        setCheckKeywordAnd(checkInputKeywords)
        if (e.target.value?.length === 1) {
          setKeywordCount(keywordCount + 1)
        }
      }

      if (type === 'keyword_exclude') {
        setCheckKeywordExclude(checkInputKeywords)
      }
    }

    const values = [...keywords]

    if (type === 'keyword_or') {
      values[indexValue].keyword_or = textKeywords
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and = textKeywords
    }

    if (type === 'keyword_exclude') {
      values[indexValue].keyword_exclude = textKeywords
    }

    setKeywords(values)
  }

  function handlChangeKeywordColors(i: number, e: any, colorList: any, current: any, type: any, indexValue: number) {
    let keywordsColor
    const hashColor = '#' + e.hex
    if (colorList.length <= 0) {
      keywordsColor = [...colorList, hashColor]
    } else {
      if (type === 'keyword_or') {
        keywordsColor = [...colorList]
        keywordsColor[i] = hashColor
      }

      if (type === 'keyword_and') {
        keywordsColor = [...colorList]
        keywordsColor = [hashColor]
      }
    }

    const values = [...keywords]

    setKeywords(values)

    if (type === 'keyword_or') {
      values[indexValue].keyword_or_color = keywordsColor
    }

    if (type === 'keyword_and') {
      values[indexValue].keyword_and_color = keywordsColor
      values[indexValue].color_and = hashColor
      console.log('color', values, values[indexValue].color_and)
    }
    setKeywords(values)
  }

  const { t } = useTranslation()

  return (
    <>
      <Grid container sx={{ py: 4, width: '100%' }}>
        <Grid item xs={8} sx={{ px: 4 }} style={{ marginBottom: '15px' }}>
          <Typography variant='subtitle2' className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
            <Close
              fontSize='small'
              onClick={() => {
                removeKeyword(value)
              }}
            />{' '}
            <Translations text='Keyword' />
          </Typography>

          <TextField
            fullWidth
            multiline
            size='small'
            sx={{ mt: 3.5, pr: '0px' }}
            placeholder={t('Keyword')}
            label={<Translations text='Keyword' />}
            required
            value={keywords[indexNumber]?.name || ''}
            onChange={e => handleChangeLabel(indexNumber, e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ pr: 0 }}>
                  <ColorPicker
                    hideTextfield={true}
                    value={
                      keywords[indexNumber]?.color && keywords[indexNumber]?.color !== '#'
                        ? keywords[indexNumber]?.color
                        : createColor(randomColorKeyword)
                    }
                    onChange={(color: Color) => handleChangeColor(color, indexNumber)}
                  />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* <Grid item xs={1} sx={{ mt: 12 }}>
          <ColorPicker
            hideTextfield={true}
            value={
              keywords[indexNumber]?.color && keywords[indexNumber]?.color != '#'
                ? keywords[indexNumber]?.color
                : createColor(randomColorKeyword)
            }
            onChange={(color: Color) => {
              handleChangeColor(color, indexNumber)
            }}
          />

          {keyword_and.length > 0 && !keyword_and[0] && !keyword_or[0] && !keyword_exclude[0] ? (
            
          ) : (
            ''
          )}
        </Grid> */}

        {/* <Grid item sm={4} xs={12} sx={{ px: 4 }}>
          {keyword_and &&
            keyword_and.length > 0 &&
            keyword_and.map((text: any, index: number) => {
              return (
                <InputKeyword
                  value={value}
                  key={index}
                  textValue={text}
                  handleTextKeyword={handleTextKeyword}
                  addMoreKeyword={addMoreKeyword}
                  removeTextKeyword={removeTextKeyword}
                  list={keyword_and}
                  type={'keyword_and'}
                  index={index}
                  indexValue={indexNumber}
                  label={'คำที่ต้องมี (AND)'}
                  colorList={color_and || keyword_and_color || ''}
                  handlChangeKeywordColors={handlChangeKeywordColors}
                  addMoreKeywordColors={addMoreKeywordColors}
                  removeKeywordColors={removeKeywordColors}
                  keywordCount={keywordCount}
                  keywordLimit={keywordLimit}
                />
              )
            })}

          {!keyword_and ||
            (keyword_and.length <= 0 && (
              <InputKeyword
                value={value}
                textValue={''}
                handleTextKeyword={handleTextKeyword}
                removeTextKeyword={removeTextKeyword}
                addMoreKeyword={addMoreKeyword}
                list={keyword_and}
                type={'keyword_and'}
                index={0}
                indexValue={indexNumber}
                label={'คำที่ต้องมี (AND)'}
                colorList={color_and || keyword_and_color || ''}
                handlChangeKeywordColors={handlChangeKeywordColors}
                addMoreKeywordColors={addMoreKeywordColors}
                removeKeywordColors={removeKeywordColors}
                keywordCount={keywordCount}
                keywordLimit={keywordLimit}
              />
            ))}
        </Grid> */}

        {/* <Grid
          item
          sm={4}
          xs={12}
          sx={{ px: 4 }}
          style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000' }}
        >
          {keyword_or &&
            keyword_or.length > 0 &&
            keyword_or.map((text: any, index: number) => {
              return (
                <InputKeyword
                  key={index}
                  value={value}
                  textValue={text}
                  handleTextKeyword={handleTextKeyword}
                  addMoreKeyword={addMoreKeyword}
                  removeTextKeyword={removeTextKeyword}
                  list={keyword_or}
                  type={'keyword_or'}
                  index={index}
                  indexValue={indexNumber}
                  label={'คำที่สนใจ (OR)'}
                  colorList={keyword_or_color || []}
                  handlChangeKeywordColors={handlChangeKeywordColors}
                  addMoreKeywordColors={addMoreKeywordColors}
                  removeKeywordColors={removeKeywordColors}
                  keywordCount={keywordCount}
                  keywordLimit={keywordLimit}
                />
              )
            })}

          {!keyword_or && keyword_or.length <= 0 && (
            <InputKeyword
              value={value}
              textValue={''}
              handleTextKeyword={handleTextKeyword}
              removeTextKeyword={removeTextKeyword}
              addMoreKeyword={addMoreKeyword}
              list={keyword_or}
              type={'keyword_or'}
              index={0}
              indexValue={indexNumber}
              label={'คำที่สนใจ (OR)'}
              colorList={keyword_or_color || []}
              handlChangeKeywordColors={handlChangeKeywordColors}
              addMoreKeywordColors={addMoreKeywordColors}
              removeKeywordColors={removeKeywordColors}
              keywordCount={keywordCount}
              keywordLimit={keywordLimit}
            />
          )}
        </Grid> */}

        <Grid item sm={4} xs={12} sx={{ px: 4, pt: 8.3}}>
          {keyword_exclude &&
            keyword_exclude.length > 0 &&
            keyword_exclude.map((text: any, index: number) => {
              return (
                <InputKeyword
                  value={value}
                  key={index}
                  textValue={text}
                  handleTextKeyword={handleTextKeyword}
                  addMoreKeyword={addMoreKeyword}
                  removeTextKeyword={removeTextKeyword}
                  list={keyword_exclude}
                  type={'keyword_exclude'}
                  index={index}
                  indexValue={indexNumber}
                  label={'คำที่ห้ามมี (Exclude)'}
                  handlChangeKeywordColors={handlChangeKeywordColors}
                  addMoreKeywordColors={addMoreKeywordColors}
                  removeKeywordColors={removeKeywordColors}
                  keywordCount={keywordCount}
                  keywordLimit={keywordLimit}
                />
              )
            })}

          {!keyword_exclude ||
            (keyword_exclude.length <= 0 && (
              <InputKeyword
                value={value}
                textValue={''}
                handleTextKeyword={handleTextKeyword}
                removeTextKeyword={removeTextKeyword}
                addMoreKeyword={addMoreKeyword}
                list={keyword_exclude}
                type={'keyword_exclude'}
                index={0}
                indexValue={indexNumber}
                label={'คำที่ห้ามมี (Exclude)'}
                handlChangeKeywordColors={handlChangeKeywordColors}
                addMoreKeywordColors={addMoreKeywordColors}
                removeKeywordColors={removeKeywordColors}
                keywordCount={keywordCount}
                keywordLimit={keywordLimit}
              />
            ))}
        </Grid>
      </Grid>
    </>
  )
}

const InputKeyword = (props: any) => {
  const {
    value,
    textValue,
    handleTextKeyword,
    addMoreKeyword,
    removeTextKeyword,
    list,
    indexValue,
    type,
    label,
    index,
    handlChangeKeywordColors,
    addMoreKeywordColors,
    removeKeywordColors,
    colorList,
    keywordCount,
    keywordLimit
  } = props

  const [text, setText] = useState(textValue)
  const [keywordColor, setKeywordColor] = useState<any>(createColor(GenerateRandomColor()))
  const [keywordColors, setKeywordColors] = useState(createColor(GenerateRandomColor()))
  useEffect(() => {
    setText(textValue)
    if (index === 0 && colorList) {
      setKeywordColors(colorList[0] || createColor(randomHexColor))
    } else if (index && colorList) {
      setKeywordColors(colorList && colorList[index] ? colorList[index] : createColor(GenerateRandomColor()))
    }

    if (typeof colorList === 'string') {
      setKeywordColor(colorList)
    }
  }, [textValue])

  function handleChangeText(e: any, index: any, indexValue: any) {
    setText(e.target.value)
    handleTextKeyword(index, e, list, value, type, indexValue)
  }

  return (
    <>
      <span style={{ display: 'flex' }}>
        {label === 'คำที่สนใจ (OR)' ? (
          <Grid sx={{ display: 'flex' }}>
            <span style={{ marginTop: 15 }}>
              {text ? (
                <ColorPicker
                  hideTextfield={true}
                  value={keywordColors || createColor(randomColorKeyword)}
                  onChange={(color: Color) => {
                    setKeywordColors(color)
                    handlChangeKeywordColors(index, color, colorList, value, type, indexValue)
                  }}
                />
              ) : (
                ''
              )}
            </span>

            <TextField
              fullWidth
              multiline
              size='small'
              sx={{ mt: 3.5 }}
              placeholder={label}
              label={label}
              value={text}
              onChange={e => handleChangeText(e, index, indexValue)}
            />
          </Grid>
        ) : (
          <>
            <TextField
              fullWidth
              multiline
              size='small'
              sx={{ mt: 3.5 }}
              placeholder={label}
              label={label}
              value={text}
              onChange={e => handleChangeText(e, index, indexValue)}
            />
          </>
        )}

        {list.length > 1 && (
          <Close
            fontSize='small'
            sx={{ mt: 5.5 }}
            onClick={() => {
              removeTextKeyword(index, indexValue, list, type)
              removeKeywordColors(index, indexValue, colorList, type)
            }}
          />
        )}
        <br />
      </span>

      {list.length === index + 1 && (
        <>
          {label === 'คำที่สนใจ (OR)' ? (
            <Grid sx={{ display: 'flex', mt: 3 }}>
              {keywordCount >= keywordLimit ? (
                ''
              ) : (
                <Button
                  sx={{ mt: '3%', p: '0px' }}
                  size='small'
                  variant='contained'
                  startIcon={<Plus fontSize='small' />}
                  onClick={() => {
                    addMoreKeyword(indexValue, list, value, type)
                    addMoreKeywordColors(indexValue, colorList, value, type)
                  }}
                ></Button>
              )}
            </Grid>
          ) : label === 'คำที่ต้องมี (AND)' ? (
            <Grid sx={{ display: 'flex', mt: 3 }}>
              {keywordCount >= keywordLimit ? (
                ''
              ) : (
                <>
                  <Button
                    sx={{ mt: '3%', p: '0px', mr: 4 }}
                    size='small'
                    variant='contained'
                    startIcon={<Plus fontSize='small' />}
                    onClick={() => {
                      addMoreKeyword(indexValue, list, value, type)
                    }}
                  ></Button>
                </>
              )}
              <span style={{ marginTop: 5 }}>
                {(text && index == 0) || index > 0 ? (
                  <ColorPicker
                    hideTextfield={true}
                    value={keywordColor || createColor(randomColorKeyword)}
                    onChange={(color: Color) => {
                      setKeywordColor(color)
                      handlChangeKeywordColors(index, color, colorList, value, type, indexValue)
                    }}
                  />
                ) : (
                  ''
                )}
              </span>
            </Grid>
          ) : (
            <Grid sx={{ display: 'flex', mt: 3 }}>

              {/* <Button
                sx={{ mt: '3%', p: '0px', mr: 4 }}
                size='small'
                variant='contained'
                startIcon={<Plus fontSize='small' />}
                onClick={() => {
                  addMoreKeyword(indexValue, list, value, type)
                }}
              ></Button> */}

            </Grid>
          )}
        </>
      )}
    </>
  )
}

export default KeywordForm
