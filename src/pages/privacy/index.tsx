import { Grid, CardHeader, CardContent, Paper, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const PrivacyNotice = () => {
  const { i18n } = useTranslation()

  return (
    <Grid container spacing={2}>
      {i18n.language === 'th' ? (
        <Grid item xs={12}>
          <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
            <CardHeader title='ประกาศความเป็นส่วนตัว' sx={{ textAlign: 'center' }} />
            <CardContent>
              <Typography variant='body1' sx={{ textAlign: 'center', pl: 4, pr: 4 }}>
                <b>
                  <i>
                    "เราทราบดีว่าท่านเป็นห่วงและให้ความสำคัญกับวิธีการที่ข้อมูลของท่านจะถูกเก็บรวบรวม
                    ซึ่งเราซาบซึ้งในความไว้วางใจของท่าน
                    เราจึงขอยืนยันว่าจะดูแลข้อมูลส่วนบุคคลของท่านด้วยความระมัดระวังและอย่างสมเหตุสมผล
                    ตลอดจนมอบอำนาจในการควบคุมข้อมูลให้แก่ท่าน
                    เพื่อส่งมอบประสบการณ์และการให้บริการลูกค้าอย่างดีที่สุดให้แก่ท่านโดยเฉพาะ"
                  </i>
                </b>
              </Typography>
              <Typography variant='body1' mt={3}>
                <b>บริษัท มิเนอร์วา คอนซัลแตนท์ จำกัด  (ซึ่งต่อไปนี้จะเรียกรวมกันว่า “บริษัท” “เรา” หรือ “ของเรา”)</b>{' '}
                เล็งเห็นถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของท่าน ผู้ใช้ผลิตภัณฑ์และบริการของเรา
                เราทราบดีว่าท่านเป็นห่วงและให้ความสำคัญกับวิธีการที่ข้อมูลของท่านจะถูกเก็บรวบรวม
                ซึ่งเราจะนำข้อมูลที่ท่านให้กับเรานั้นไปใช้เพื่อมอบผลิตภัณฑ์และให้บริการที่ตรงกับความต้องการและความจำเป็นที่ออกแบบมาอย่างเหมาะสมสำหรับท่าน
                บริษัทฯ
                ซาบซึ้งในความไว้วางใจของท่านและเราจะดูแลข้อมูลส่วนบุคคลของท่านด้วยความระมัดระวังและอย่างสมเหตุสมผลในการมอบประสบการณ์และการให้บริการลูกค้าอย่างดีที่สุดให้แก่ท่านโดยเฉพาะ
              </Typography>

              <Typography variant='body1' mt={5}>
                นโยบายความเป็นส่วนตัวฉบับนี้ <b>(“นโยบายความเป็นส่วนตัว”)</b> ครอบคลุมถึงเว็บไซต์ เว็บแอปพลิเคชัน
                ศูนย์บริการข้อมูลลูกค้า (call center) ช่องทางสื่อสังคมออนไลน์ ช่องทางการสื่อสารทางออนไลน์
                ตลอดจนสถานที่อื่น ๆ ที่ได้มีการเก็บข้อมูลส่วนบุคคลของท่าน อย่างไรก็ตาม
                กรุณาอ่านนโยบายความเป็นส่วนตัวฉบับนี้ควบคู่กับข้อตกลงและเงื่อนไขสำหรับบริการเฉพาะดังกล่าวที่ท่านใช้ 
                (ซึ่งอาจมีกำหนดไว้แยกต่างหากตามประเภทของข้อมูลส่วนบุคคลที่เราเก็บจากท่าน)
              </Typography>

              <Typography variant='body1' mt={5}>
                เพื่อให้เป็นไปตามวัตถุประสงค์ตามนโยบายความเป็นส่วนตัวฉบับนี้ <b>“ข้อมูลส่วนบุคคล”</b> หมายถึง ข้อมูลใด ๆ
                ที่เกี่ยวข้องกับตัวบุคคลหรือที่ทำให้สามารถระบุตัวบุคคลนั้นได้
              </Typography>

              <Typography variant='body1' mt={5}>
                บริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว ดังนั้น
                โปรดตรวจสอบเป็นประจำเพื่อดูว่านโยบายความเป็นส่วนตัวนี้ได้รับการแก้ไขครั้งล่าสุดเมื่อใด การเปลี่ยนแปลงใด
                ๆ จะมีผลทันทีเมื่อเราเผยแพร่นโยบายความเป็นส่วนตัวที่แก้ไขดังกล่าวลงในเว็บไซต์หรือแอปพลิเคชันของเรา
              </Typography>

              <Typography variant='body1' mt={1}>
                เราจะแจ้งให้ท่านทราบหากมีการแก้ไขหรือปรับปรุงที่สำคัญ
                ส่วนกรณีเป็นการแก้ไขเปลี่ยนแปลงที่เป็นการลิดรอนสิทธิของท่านในส่วนของข้อมูลที่ละเอียดอ่อนตามนโยบายความเป็นส่วนตัวฉบับนี้
                บริษัทจะดำเนินการเพื่อขอความยินยอมจากท่านก่อน เว้นแต่เป็นกรณีที่กฎหมายกำหนดเป็นอย่างอื่น
              </Typography>

              <Typography variant='h6' mt={5} sx={{ fontWeight: 'bold' }}>
                นโยบายความเป็นส่วนตัว
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                เราเก็บข้อมูลอะไรบ้าง
              </Typography>
              <Typography variant='body1' mt={1}>
                เราเก็บข้อมูลของท่านเมื่อท่านเข้าถึงหรือได้ลงทะเบียนในเว็บไซต์แอปพลิเคชัน
                หรือเว็บแอปพลิเคชันในโทรศัพท์มือถือ (ที่กล่าวถึงผลิตภัณฑ์ของ บริษัท มิเนอร์วา คอนซัลแตนท์ จำกัด)
                หรือในการทำธุรกรรมในรูปแบบใด ๆ หรือด้วยวิธีใด ๆ กับทางเรา ดังนี้
              </Typography>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>ข้อมูลส่วนตัว</b>เช่น คำนำหน้าชื่อ ชื่อเต็ม อาชีพ ตำแหน่งงาน ประเภทธุรกิจ ชื่อบริษัทหรือองค์กร
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>ข้อมูลเพื่อการติดต่อ</b> เช่น ที่อยู่ทางไปรษณีย์ ข้อมูลการจัดส่ง ที่อยู่สำหรับส่งใบแจ้งหนี้
                ที่อยู่ที่เป็นที่พักอาศัย ที่อยู่ของสถานที่ทำงาน ที่อยู่ตามที่ปรากฏบนหน้าบัตรประจำตัวประชาชน
                หมายเลขโทรศัพท์ หมายเลขโทรสาร ที่อยู่อีเมล ไลน์ไอดี (LINE ID) รวมไปถึงข้อมูลผู้ติดต่อ เช่น
                หมายเลขโทรศัพท์ ข้อมูลการติดต่อบนช่องทางอื่น ๆ (เช่น การติดต่อสื่อสารเป็นลายลักษณ์อักษรกับท่าน)
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>รายละเอียดข้อมูลส่วนตัว</b>เช่น ชื่อผู้ใช้และรหัสผ่านของท่าน
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>ข้อมูลการเป็นสมาชิก</b> เช่น รายละเอียดข้อมูลบัญชีสมาชิก ประเภทลูกค้า
                วันและเดือนที่เข้าร่วม/วันที่สมัคร ระยะเวลาการเป็นสมาชิก
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>ข้อมูลการใช้งาน</b> เช่น ข้อมูลเกี่ยวกับการค้นหาหรือใช้งานของท่านบนเว็บไซต์ เว็บแอปพลิเคชัน
                การใช้ผลิตภัณฑ์และบริการของเรา ตลอดจนคำร้องเรียนและข้อเรียกร้อง
              </li>

              <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 4 }}>
                เราเก็บข้อมูส่วนบุคคลของท่านไว้นานเท่าใด
              </Typography>
              <Typography variant='body1' sx={{ mt: 1 }}>
                เราเก็บรักษาข้อมูลไว้นานเท่าที่จำเป็น เพื่อให้บริการและเพื่อวัตถุประสงค์อื่น ๆ
                ที่กำหนดไว้ในนโยบายความเป็นส่วนตัวนี้ นอกจากนี้
                เรายังเก็บรักษาข้อมูลเมื่อจำเป็นเพื่อปฏิบัติตามข้อผูกมัดตามสัญญาและกฎหมาย
                เมื่อเรามีผลประโยชน์ทางธุรกิจที่ชอบด้วยกฎหมายในการดำเนินการดังกล่าว (เช่น การปรับปรุงและพัฒนา
                การเพิ่มความปลอดภัย การรักษาความปลอดภัย และเสถียรภาพ) และสำหรับการดำเนินการหรือการป้องกัน
                การเรียกร้องทางกฎหมาย
              </Typography>

              <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 4 }}>
                เราจัดเก็บข้อมูลส่วนบุคคลของคุณไว้ที่ใด
              </Typography>
              <Typography variant='body1' sx={{ mt: 1 }}>
                ข้อมูลของคุณอาจถูกจัดเก็บไว้ในเซิร์ฟเวอร์ที่อยู่ภายประเทศไทย
              </Typography>

              <Box mt={6}></Box>
              <Typography variant='h6' sx={{ mt: 4 }}>
                <b>เราใช้ข้อมูลของท่านอย่างไร</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                ข้อมูลใด ๆ ก็ตามที่เราได้เก็บจากท่านจะถูกนำไปใช้ในทางใดทางหนึ่งดังต่อไปนี้
              </Typography>

              <li style={{ marginLeft: '10px', marginTop: '5px' }}>
                ช่วยเก็บรักษาความปลอดภัย ความมีเสถียรภาพ และความสมบูรณ์ของบริการต่าง ๆ และรวมถึงผู้ใช้ของเรา
              </li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>ให้ความช่วยเหลือด้านต่าง ๆ สำหรับผู้ใช้</li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>สามารถติดต่อสื่อสารระหว่างเรากับผู้ใช้ได้</li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>
                ทำการวิจัยและพัฒนาบริการของเรา เพื่อให้แน่ใจว่าบริการของเราทำงานตามที่คาดหวังไว้ เช่น
                การติดตามการประมวลผลของผลลัพธ์คำที่คุณค้นหาถูกต้องหรือการแก้ปัญหาที่คุณรายงานถึงเรา{' '}
              </li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>ดำเนินการที่เกี่ยวข้องกับกฎหมาย</li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>ทำการวิจัยและพัฒนา</li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>
                ส่งการสื่อสารทางการตลาดและการสื่อสารที่ไม่เกี่ยวกับการตลาดให้ผู้ใช้ทราบ
                (รายละเอียดเพิ่มเติมระบุไว้ที่ด้านล่าง)
              </li>

              <Typography variant='body1' mt={3}>
                ในบางครั้ง เราอาจใช้ฐานข้อมูลที่เราเก็บไว้เพื่อประชาสัมพันธ์บริการต่าง ๆ ของเราให้ลูกค้าของเราทราบ
                ซึ่งรวมถึงการส่งการสื่อสารเกี่ยวกับบริการ รูปแบบการบริการ การส่งเสริมการขาย การชิงโชค การศึกษา การสำรวจ
                ข่าวสาร การอัปเดต และเหตุการณ์สำคัญของบริษัท ทางเราอาจติดต่อสื่อสารทางการตลาดทางไปรษณีย์ ทางโทรศัพท์
                ทางบริการส่งข้อความสั้น บริการส่งข้อความออนไลน์ การส่งข้อความเตือนและอีเมล
              </Typography>
              <Typography variant='body1' mt={3}>
                เราอาจส่งการสื่อสารให้ผู้ใช้ของเราทราบเกี่ยวกับผลิตภัณฑ์และบริการต่าง ๆ สำหรับเครือข่ายพันธมิตรของเรา
                แม้ว่าเราอาจส่งการสื่อสารเกี่ยวกับผลิตภัณฑ์และบริการต่าง ๆ สำหรับเครือข่ายพันธมิตรดังกล่าว
                แต่เราจะไม่ขายข้อมูลส่วนบุคคลของผู้ใช้ หรือแบ่งปันข้อมูลดังกล่าวให้เครือข่ายพันธมิตรใด
                หรือเพื่อจุดประสงค์อื่นใดนอกเหนือจากการทำการตลาดทางตรงและการโฆษณา
                เว้นแต่ว่าเราได้รับการยินยอมจากผู้ใช้แล้ว
              </Typography>
              <Typography variant='body1' mt={3}>
                เราอาจใช้ข้อมูลที่เราเก็บไว้เพื่อปรับแต่งการสื่อสารทางการตลาด (รวมถึงการโฆษณา) ที่ทางเราได้ให้บริการ
                รวมถึงข้อมูลตำแหน่งที่ตั้งของผู้ใช้ ข้อมูลการบริการต่าง ๆ ของบริษัทสำหรับข้อมูลที่ได้เก็บรวบรวมไว้
                รวมทั้งความชื่นชอบและการตั้งค่าของผู้ใช
                เราอาจใช้ข้อมูลส่วนบุคคลเพื่อวิเคราะห์ความชื่นชอบของลูกค้าและแนวโน้มทางการตลาดและรับความคิดเห็นต่าง ๆ
                ซึ่งทางเราอาจใช้เพื่อปรับแต่งชนิดของผลิตภัณฑ์และการนำเสนอสินค้าให้ท่าน
                ซึ่งอาจเป็นการรวมข้อมูลส่วนบุคคลที่เกี่ยวกับการใช้บริการของท่าน
                และข้อมูลเกี่ยวกับการใช้เว็บไซต์ของท่านซึ่งทางเราได้เก็บไว้
                เราอาจรวมข้อมูลเกี่ยวกับท่านกับข้อมูลของผู้ใช้รายอื่นที่ทางเราได้เก็บไว้เพื่อทำความเข้าใจและวางแนวทางการทำการตลาด
                เราอาจใช้บริการโฆษณาต่าง ๆ และผลิตภัณฑ์ของผู้ให้บริการรายอื่น (เช่น บริษัทที่ให้บริการด้านการตลาด
                และแพลตฟอร์มโซเชียลมีเดีย) เพื่อจุดประสงค์ทางการตลาดและการส่งเสริมการขาย
                ซึ่งทางเราอาจแบ่งปันข้อมูลส่วนบุคคลของท่านที่เรามีกับผู้ให้บริการดังกล่าว
              </Typography>
              <Typography variant='body1' mt={3}>
                เราอาจใช้ข้อมูลที่เราเก็บไว้เพื่อจัดทำและส่งใบเสร็จให้ผู้ใช้ แจ้งการเปลี่ยนแปลงข้อกำหนด การบริการ
                หรือนโยบายของเรา หรือส่งข้อมูลอื่น ๆ
                ที่ไม่เกี่ยวกับการประชาสัมพันธ์บริการหรือผลิตภัณฑ์ของ บริษัทหรือพันธมิตรของเรา
              </Typography>
              <Typography variant='body1' mt={3}>
                "ท่านมีสิทธิ์แจ้งเราให้ทราบว่าท่านไม่ยินยอมให้เราเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเพื่อการทำการตลาดทางตรง
                ท่านสามารถใช้สิทธิ์ของท่านเพื่อป้องกันการเก็บรวบรวมข้อมูลดังกล่าวได้
                โดยแจ้งว่าท่านไม่ยินยอมให้ทำการตลาดโดยตรง ณ สถานที่ที่เราได้เก็บข้อมูลส่วนบุคคลของท่าน
                ท่านสามารถใช้สิทธินี้
                ได้ตลอดเวลาที่ต้องการหลังจากทางเราได้เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของท่านเพื่อทำการตลาดโดยตรงแล้วดังกล่าว
                โดยการทำตามคำแนะนำวิธีการที่เราได้แจ้งไว้ให้ทราบ
                โดยขอสงวนสิทธิ์ที่จะไม่รับการสื่อสารจากช่องทางการสื่อสารต่าง ๆ ที่ไม่เป็นไปตามวิธีการแจ้งตามที่กำหนด
                ท่านรับทราบแล้วว่าหากท่านเลือกยกเลิกการลงทะเบียนหรือไม่รับการติดต่อสื่อสารทางการตลาด
                ท่านยังจะได้รับอีเมลจากฝ่ายการจัดการ
              </Typography>
              <Typography variant='body1' mt={1}>
                การสรุปบัญชี และการอัปเดตบริการต่าง ๆ ของเรา"
              </Typography>

              <Typography variant='h6' style={{ marginTop: '20px', fontWeight: 'bold' }}>
                เราป้องกันข้อมูลของท่านอย่างไร
              </Typography>
              <Typography variant='body1' mt={1}>
                บริษัทฯ ตระหนักถึงความสำคัญของการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลของท่าน บริษัทฯ
                จึงพยายามอย่างยิ่งที่จะปกป้องข้อมูลของท่านด้วยการกำหนดให้มีมาตรการในการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลของท่านอย่างเหมาะสมและสอดคล้องกับการรักษาความลับของข้อมูลส่วนบุคคลเพื่อป้องกันการสูญหาย
                เข้าถึง ทำลาย ใช้ แปลง แก้ไข หรือเปิดเผย โดยไม่มีสิทธิหรือโดยไม่ชอบด้วยกฎหมาย โดยบริษัทฯ
                จะตรวจสอบวิธีการเก็บรวบรวมข้อมูลส่วนบุคคล
                พื้นที่ในการจัดเก็บข้อมูลและดำเนินการตามหลักปฏิบัติในการประมวลผล รวมถึงมาตรการความปลอดภัยทางกายภาพ
                ให้เป็นไปตามที่กำหนดในนโยบายและแนวปฏิบัติในการรักษาความมั่นคงปลอดภัยด้านเทคโนโลยีสารสนเทศของบริษัท
              </Typography>

              <Typography variant='h6' style={{ marginTop: '20px', fontWeight: 'bold' }}>
                เราเปิดเผยข้อมูลให้บุคคลอื่นหรือไม่
              </Typography>
              <Typography variant='body1' mt={1}>
                เราจะไม่ขาย แลกเปลี่ยน หรือโอนข้อมูลซึ่งสามารถระบุตัวตนของท่านได้ให้บุคคลอื่น
                ยกเว้นบุคคลอื่นที่ทางเราเชื่อใจให้ช่วยดำเนินการดูแลเว็บไซต์ บุคคลในธุรกิจของเรา
                หรือบุคคลผู้ให้บริการแก่ท่าน
                ตราบเท่าที่บุคคลเหล่านั้นยังตกลงรักษาข้อมูลดังกล่าวให้เป็นความลับตามข้อตกลงภายในองค์กรของเรา
                ในกรณีที่เราอาจเปิดเผยข้อมูลของท่านเมื่อเราเชื่อว่าการเปิดเผยดังกล่าวเป็นไปตามวิธีปฏิบัติตามกฎหมาย
                และเพื่อการบังคับตามนโยบายของเว็บไซต์ของเรา หรือรักษาสิทธิ ทรัพย์สิน
                และความปลอดภัยของทางเราหรือบุคคลอื่น อย่างไรก็ตาม
                ในบางครั้งทางเราอาจให้ข้อมูลผู้เข้าชมเว็บไซต์ที่ไม่ได้ระบุตัวตนผู้ใช้แก่บุคคลอื่นเพื่อการทำการตลาด
                การโฆษณา หรือการใช้อื่น ๆ
              </Typography>

              <Typography variant='h6' style={{ marginTop: '20px', fontWeight: 'bold' }}>
                การเชื่อมต่อลิงก์ของบุคคลอื่น
              </Typography>
              <Typography variant='body1' mt={1}>
                ในบางครั้ง ทางเราอาจพิจารณานำเสนอผลิตภัณฑ์หรือบริการของบุคคลอื่นในเว็บไซต์ เว็บแอพพลิเคชัน
                หรือแอปพลิเคชันในโทรศัพท์มือถือ
                เว็บไซต์ของบุคคลอื่นมีนโยบายความเป็นส่วนตัวที่แยกออกไปต่างหากและเป็นอิสระ
                เราจะไม่รับผิดชอบหรือรับผิดต่อเนื้อหาและกิจกรรมต่าง ๆ ในเว็บไซต์ที่ได้เชื่อมต่อไว้ แต่อย่างไรก็ตาม
                เราจะพยายามรักษาความสมบูรณ์ของเว็บไซต์ของเราและยินดีรับฟังความคิดเห็นเกี่ยวกับเว็บไซต์อื่น ๆ เหล่านั้น
              </Typography>

              <Typography variant='h6' style={{ marginTop: '20px', fontWeight: 'bold' }}>
                ข้อตกลงของผู้ใช้งาน
              </Typography>
              <Typography variant='body1' mt={1}>
                ท่านสามารถเข้าตรวจสอบในส่วนข้อตกลงของผู้ใช้งาน ของเรา ที่ระบุรายละเอียดการใช้ การปฏิเสธความรับผิด
                และข้อจำกัดความรับผิดในการใช้เว็บไซต์ แอพปพลิเคชัน หรือแอปพลิเคชันในโทรศัพท์มือถือของเรา
              </Typography>

              <Typography variant='h6' style={{ marginTop: '20px', fontWeight: 'bold' }}>
                มาตรการรักษาความมั่นคงปลอดภัยของข้อมูล
              </Typography>
              <Typography variant='body1' mt={1}>
                เราให้ความสำคัญกับความปลอดภัยของข้อมูลส่วนบุคคลของท่าน
                จึงจัดให้มีมาตรการในการรักษาความมั่นคงปลอดภัยทางเทคนิคและการบริหารจัดการ
                เพื่อให้ท่านมั่นใจว่าข้อมูลส่วนบุคคลของท่านจะไม่ถูกเข้าถึง แก้ไข เปลี่ยนแปลง ลบหรือทำลายโดยผู้ไม่มีสิทธิ
              </Typography>

              <Typography variant='h6' style={{ marginTop: '20px', fontWeight: 'bold' }}>
                การเปลี่ยนแปลงนโยบายความเป็นส่วนตัวของเรา
              </Typography>
              <Typography variant='body1' mt={1}>
                เราจะปรับปรุงนโยบายความเป็นส่วนตัวของเราเป็นครั้งคราวไป และจะเผยแพร่ฉบับอัปเดตไว้บนเว็บไซต์ของเรา
                ท่านสามารถตรวจสอบได้ตลอดเวลาเป็นระยะ เพื่อดูว่ามีการอัปเดตหรือการเปลี่ยนแปลงใด ๆ
                ในนโยบายความเป็นส่วนตัวหรือไม่ ในกรณีที่ท่านใช้บริการของบริษัทต่อไปโดยไม่แจ้งข้อสงสัยหรือปัญหาอย่างใด ๆ
                ให้เราทราบ จะถือว่าท่านได้ตกลงตามนโยบายความเป็นส่วนตัวฉบับนี้ของเรา
              </Typography>

              <Typography variant='h6' style={{ marginTop: '20px', fontWeight: 'bold' }}>
                {' '}
                สิทธิของเจ้าของข้อมูลส่วนบุคคล{' '}
              </Typography>
              <Typography variant='body1' mt={1}>
                ภายใต้บทบัญญัติแห่งกฎหมายและข้อยกเว้นตามกฎหมายที่เกี่ยวข้อง ท่านอาจมีสิทธิตามที่ระบุไว้ดังต่อไปนี้
              </Typography>

              <li style={{ marginLeft: '25px', marginTop: '20px' }}>
                {' '}
                <b>การเข้าถึง</b> ท่านอาจมีสิทธิในการขอเข้าถึงหรือขอรับสำเนาข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
                ใช้หรือเปิดเผยเกี่ยวกับท่าน ทั้งนี้ เพื่อความเป็นส่วนตัวและความปลอดภัยของท่าน
                เราอาจขอให้ท่านพิสูจน์ตัวตนของท่านก่อนจะให้ข้อมูลตามที่ท่านขอ{' '}
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                {' '}
                <b>การแก้ไขให้ถูกต้อง</b> ท่านอาจมีสิทธิขอให้มีการดำเนินการแก้ไขข้อมูลส่วนบุคคลที่เราได้เก็บรวบรวม
                ใช้หรือเปิดเผยเกี่ยวกับท่าน ให้ถูกต้อง เป็นปัจจุบัน สมบูรณ์ และไม่ก่อให้เกิดความเข้าใจผิด{' '}
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>การโอนย้ายข้อมูล</b>
                ท่านอาจมีสิทธิขอรับข้อมูลส่วนบุคคลที่เรามีเกี่ยวกับท่านในรูปแบบที่มีการจัดระเบียบแล้วและสามารถอ่านได้ในรูปแบบอิเล็กทรอนิกส์
                และเพื่อส่งหรือโอนข้อมูลดังกล่าวไปยังผู้ควบคุมข้อมูลส่วนบุคคลอื่น โดยต้องเป็น (ก)
                ข้อมูลส่วนบุคคลที่ท่านได้ให้กับเรา และ (ข) กรณีที่เราได้รับความยินยอมจากท่านในการเก็บรวบรวม ใช้
                หรือเปิดเผยหรือเพื่อปฏิบัติตามสัญญาที่เรามีกับท่าน{' '}
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                {' '}
                <b>การคัดค้าน</b> ท่านอาจมีสิทธิคัดค้านการเก็บรวบรวม ใช้หรือเปิดเผยข้อมูลส่วนบุคคลของท่าน เช่น
                การคัดค้านการตลาดแบบตรง{' '}
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                {' '}
                <b>การขอให้ระงับการใช้:</b> ท่านอาจมีสิทธิขอให้ระงับการใช้ข้อมูลส่วนบุคคลของท่านในบางกรณี{' '}
              </li>
              <li style={{ marginLeft: '25px', marginTop: '20px' }}>
                <b>การถอนความยินยอม</b> สำหรับวัตถุประสงค์ที่ท่านได้ให้ความยินยอมให้เราเก็บรวบรวม
                ใช้หรือเปิดเผยข้อมูลส่วนบุคคลของท่าน ท่านมีสิทธิที่จะถอนความยินยอมของท่าน ณ เวลาใด ก็ได้
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>การลบหรือทำลายข้อมูล</b>ท่านอาจมีสิทธิขอให้เราดำเนินการลบหรือทำลาย
                หรือทำให้ข้อมูลส่วนบุคคลของท่านที่เราเก็บรวบรวม ใช้หรือเปิดเผย
                เป็นข้อมูลที่ไม่สามารถระบุตัวบุคคลที่เป็นเจ้าของข้อมูล เว้นเสียแต่ว่า
                การเก็บรักษาข้อมูลดังกล่าวของเรานั้นเป็นไปเพื่อการปฏิบัติตามกฎหมาย
                หรือเพื่อก่อตั้งสิทธิเรียกร้องตามกฎหมาย เพื่อการใช้ หรือการปกป้องสิทธิเรียกร้องตามกฎหมาย
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>การยื่นเรื่องร้องเรียน </b>
                ท่านอาจมีสิทธิยื่นเรื่องร้องเรียนไปยังหน่วยงานที่มีอำนาจในกรณีที่ท่านเชื่อว่าการเก็บรวบรวม
                ใช้หรือเปิดเผยข้อมูลส่วนบุคคลของเรานั้นไม่ชอบด้วยกฎหมายหรือไม่สอดคล้องกับกฎหมายคุ้มครองข้อมูลที่บังคับใช้
              </li>

              <Typography variant='h6' mt={4} sx={{ fontWeight: 'bold' }}>
                รายละเอียดการติดต่อเรา
              </Typography>

              <Typography variant='body1' mt={1}>
                หากท่านมีความประสงค์ที่จะใช้สิทธิของท่านที่เกี่ยวข้องกับข้อมูลส่วนบุคคลของท่าน
                หรือหากท่านมีข้อสงสัยเกี่ยวกับข้อมูลส่วนบุคคลของท่านภายใต้นโยบายความเป็นส่วนตัวฉบับนี้
                โปรดติดต่อเราหรือเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของเราที่ บริษัท มิเนอร์วา คอนซัลแตนท์  จำกัด เลขที่
                1004-1005 ชั้น 10 อาคารพร้อมพันธุ์ 3 ลาดพร้าวซอย 3 แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900
              </Typography>

              <Typography variant='body1' mt={1}>
                <b>เว็บไซต์ : </b> www.minerva-th.com
              </Typography>
              <Typography variant='body1' mt={1}>
                <b>อีเมล :</b> contact@minerva-th.com
              </Typography>
              <Typography variant='body1' mt={1}>
                <b>Line Official : </b> @minerva-th
              </Typography>
            </CardContent>
          </Paper>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
            <CardHeader title='Privacy Notice' sx={{ textAlign: 'center' }} />
            <CardContent>
              <Typography variant='body1' sx={{ textAlign: 'center', pl: 4, pr: 4 }}>
                <b>
                  <i>
                    "We know you care how information about you is collected. We appreciate your trust and be committed
                    to carefully and sensibly handle your personal data and put you in control while giving you the very
                    best personalized experience and customer services"
                  </i>
                </b>
              </Typography>
              <Typography variant='body1' mt={5}>
                <b>Minerva Consultant Co., Ltd. (collectively, referred to as “Minerva”, “we”, “our” or “us”) </b>
                recognizes the importance of the protection of personal data for you of our products and services. We
                know you care how information about you is collected. The information you share with us allows us to
                provide the products and services you need and want appropriately tailored for you, only from Minerva
                Consultant Co., Ltd. We appreciate your trust that we will carefully and sensibly handle your personal
                data while giving you the very best personalized experience and customer services.
              </Typography>
              <Typography variant='body1' mt={5}>
                This privacy policy (this <b> "Privacy Policy" </b>) applies to our websites, mobile applications, call
                center, social networking sites, online communication channels, and other locations where we collect
                your personal data. However, please read this Privacy Policy in conjunction with the terms and
                conditions of particular service that you use. (This may be provide separately according to the type of
                Personal Data that we collect from you)
              </Typography>
              <Typography variant='body1' mt={5}>
                For the purpose of this Privacy Policy, <b>“Personal Data”</b> means any information relating to an
                identified or identifiable natural person.
              </Typography>
              <Typography variant='body1' mt={5}>
                We reserve the right to modify this Privacy Policy from time to time, so please review it frequently to
                see when this Privacy Policy was last revised. Any changes to this Privacy Policy will become effective
                when we post the revised Privacy Policy on our website or application. We will provide additional notice
                of significant updates. In case any modification deprives your rights of sensitive data in relation to
                this Privacy Policy, the Company will first obtain your consent, except as otherwise permitted by law.
              </Typography>
              <Typography variant='body1' mt={5}>
                <b>Privacy Policy</b>
              </Typography>
              <Typography variant='body1' mt={2}>
                {' '}
                <b>What information do we collect?</b>{' '}
              </Typography>
              <Typography variant='body1' mt={1}>
                We may collect information from you when you access or register our website, web app, or mobile apps
                (referring to the products of <b>Minerva Consultant Co., Ltd.,</b>) or any interactions in any form or
                by any means with us. Some examples are:
              </Typography>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Personal details, </b>
                such as title, full name, occupation, position, business type, company or organization name.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Contact details,</b>
                ssuch as postal address, delivery details, billing address, residential address, workplace address,
                address shown in the national identification card, telephone number, fax number, email address, your
                contact person's contact details (e.g., telephone number, contact data on any correspondence (e.g.
                written communication with you), and any other contact details you provided to us.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Membership details, </b>
                such as account details, customer type, member join/registration date and month, membership period.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Profile details, </b>
                such as your username and password.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Usage details,  </b>
                such as information on how you browse or use our websites, web application products and services,
                including details about complaints and claims.
              </li>

              <Typography variant='body1' mt={5}>
                <b>How long we keep your information?</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                We retain information for as long as necessary to provide the application and for the other purposes set
                out in this Privacy Policy. We also retain information when necessary to comply with contractual and
                legal obligations, when we have a legitimate business interest to do so (such as improving and
                developing the application, enhancing its safety, security and stability), and for the exercise or
                defence of legal claims.
              </Typography>
              <Typography variant='body1' mt={5}>
                <b>Where we store your information?</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                Your information is be stored on servers located in the country
              </Typography>
              <Typography variant='body1' mt={5}>
                <b>How do we use your information?</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                Any of the information we collect from you may be used in one of the following ways, but not limited to:
              </Typography>

              <li style={{ marginLeft: '10px', marginTop: '5px' }}>
                Help maintain the safety, security, and integrity of our services and users.
              </li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>Provide customer support.</li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>Enable communications between users.</li>

              <li style={{ marginLeft: '10px', marginTop: '5px' }}>
                Conduct research and development to make improvements to our services and ensure our services are
                working as intended, such as tracking outages or troubleshooting issues that you report to us.
              </li>
              <li style={{ marginLeft: '10px', marginTop: '5px' }}>In connection with legal proceedings.</li>
              <Typography variant='body1' mt={2} sx={{ fontWeight: 'bold' }}>
                Send marketing and non-marketing communications to users (further details below).
              </Typography>
              <Typography variant='body1' mt={1}>
                From time to time, we may use the data we collect to market our services to our users. This includes
                sending users communications about SocialGuard services, features, promotions, sweepstakes, studies, surveys,
                news, updates, and events. We may communicate such marketing to you by post, telephone call, short
                message service, online messaging service, push notification and email.
              </Typography>
              <Typography variant='body1' mt={1}>
                We may also send communications to our users about products and services offered by Minerva partners.
                Although we may send users communications about Minerva partners’ products and services, we do not sell
                users’ personal data to, or share it with, such partners or others for purposes of their own direct
                marketing or advertising, except with users’ consent.
              </Typography>
              <Typography variant='body1' mt={1}>
                We may use the data we collect to personalize the marketing communications (including advertisements)
                that we send, including based on user location, past use of Minerva’s services, and user preferences and
                settings.
              </Typography>
              <Typography variant='body1' mt={1}>
                We may also use Personal Data to analyse our customers’ preferences and market trends and derive
                insights, which we may use to tailor the types of products and offers that we present to you. This may
                involve us combining Personal Data that we hold about your use of our services with information that we
                have collected about your web usage. We may also combine information that we have collected about you
                with information that we have collected about our other customers in order to derive these insights and
                establish market trends. We also use advertising services and products provided by third party service
                providers (such as marketing agencies and social media platforms) for marketing and promotional
                purposes, which may involve us sharing Personal Data that we hold about you with them. We may use the
                data we collect to generate and provide users with receipts. inform them of changes to our terms,
                services, or policies. or send other communications that aren’t for the purpose of marketing the
                services or products of Minerva or its partners.
              </Typography>
              <Typography variant='body1' mt={1}>
                You have the right to ask us not to process your Personal Data for direct marketing purposes. You can
                exercise your right to prevent such processing by indicating that you do not consent to direct marketing
                at the point at which we collect your Personal Data. You can also exercise the right at any time after
                we have collected and used your Personal data for direct marketing purposes by following the opt out
                instructions contained in the relevant communications.
              </Typography>
              <Typography variant='body1' mt={1}>
                Please note that if you choose to unsubscribe or opt out of marketing communication, you will still
                continue to receive administrative emails, account summaries and updates to our services.
              </Typography>
              <Typography variant='body1' mt={4}>
                <b>How do we protect your information?</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                The Company recognizes the importance of maintaining the security of your Personal Data. Therefore, the
                Company endeavours to protect your information by establishing security measures for your Personal Data
                appropriately and in accordance with the confidentiality safeguard of Personal Data, to prevent loss,
                unauthorized or unlawful access, destruction, use, alteration, rectification or disclosure. provided,
                however, that the Company will ensure that the method of collecting, storing and processing of your
                Personal Data, including physical safety measures follow the information technology security policies
                and guidelines of the Company.
              </Typography>
              <Typography variant='body1' mt={4}>
                <b>Do we disclose any information to outside parties?</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                We do not sell, trade, or otherwise transfer to outside parties your personally identifiable
                information. This does not include trusted third parties who assist us in operating our website,
                conducting our business, or servicing you, so long as those parties agree to keep this information
                confidential. We may also release your information when we believe release is appropriate to comply with
                the law, enforce our site policies, or protect ours or others rights, property, or safety. However,
                non-personally identifiable visitor information may be provided to other parties for marketing,
                advertising, or other uses.
              </Typography>
              <Typography variant='body1' mt={4}>
                <b>Third party links</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                Occasionally, at our discretion, we may include or offer third party products or services on our
                website, web app, or mobile apps. These third party sites have separate and independent privacy
                policies. We therefore have no responsibility or liability for the content and activities of these
                linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about
                these sites.
              </Typography>
              <Typography variant='body1' mt={4}>
                <b>Terms & Conditions</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                Please also visit our Terms & Conditions section establishing the use, disclaimers, and limitations of
                liability governing the use of our website, web app, or mobile apps.
              </Typography>
              {/* <li style={{ marginLeft: '10px', marginTop: '25px' }}>
                <b>Information Security Measures</b>
              </li>
              <Typography variant='body1' mt={1}>
                We emphasize the security of your personal information. Therefore, measures are in place to maintain
                technical and administrative security. To ensure that your personal information will not be accessed,
                corrected, changed, deleted, or destroyed by unauthorized persons.
              </Typography> */}
              <Typography variant='body1' mt={4}>
                <b>Changes to our Privacy Policy</b>
              </Typography>

              <Typography variant='body1' mt={1}>
                We will amend this Privacy Policy from time to time and the updated versions will be posted on our
                website. Please check back frequently to see any updates or changes to this Privacy Policy. Continuation
                of the use of any Minerva service without notifying us on any issues, will mean that you are in
                agreement with our latest Privacy Policy.
              </Typography>
              <Typography variant='body1' mt={4}>
                <b>Your rights as a data subject</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                Subject to applicable laws and exceptions thereof, you may have the following rights to:
              </Typography>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Access: </b>
                You may have the right to access or request a copy of the Personal Data we are collecting, using or
                disclosing about you. For your own privacy and security, we may require you to prove your identity
                before providing the requested information to you.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Rectification: </b>
                You may have the right to have incomplete, inaccurate, misleading, or or not up-to-date Personal Data
                that we collect, use or disclose about you rectified.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Data Portability:</b>
                You may have the right to obtain Personal Data we hold about you, in a structured, electronic format,
                and to send or transfer such data to another data controller, where this is (a) Personal Data which you
                have provided to us, and (b) in the case where we are collecting, using or disclosing such data on the
                basis of your consent or to perform a contract with you.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Objection: </b>
                You may have the right to object to certain collection, use or disclosure of your Personal Data such as
                objecting to direct marketing.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Restriction: </b>
                You may have the right to restrict the use of your Personal Data in certain circumstances.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Withdraw Consent: </b>
                For the purposes you have consented to our collecting, using or disclosing of your Personal Data, you
                have the right to withdraw your consent at any time.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Deletion: </b>
                You may have the right to request that we delete or de-identity Personal Data that we collect, use or
                disclose about you, except we are not obligated to do so if we need to retain such data in order to
                comply with a legal obligation or to establish, exercise, or defend legal claims.
              </li>
              <li style={{ marginLeft: '25px', marginTop: '5px' }}>
                <b>Lodge a complaint: </b>
                You may have the right to lodge a complaint to the competent authority where you believe our collection,
                use or disclosure of your Personal Data is unlawful or noncompliant with applicable data protection law.
              </li>
              <Typography variant='body1' mt={4}>
                <b>Our Contact Details</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                If you wish to contact us to exercise the rights relating to your Personal Data or if you have any
                queries about your Personal Data under this Privacy Policy, please contact us or our Data Protection
                Officer at: Minerva Consultant Co.,Ltd  1004-1005 10th Floor Phrom Phan 3, Ladprao Soi 3, Jomphol,
                Jatuchak, Bangkok 10900
              </Typography>
              <Typography variant='body1' mt={1}>
                <b>Website : www.minerva-th.com</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                <b>Email : contact@minerva-th.com</b>
              </Typography>
              <Typography variant='body1' mt={1}>
                <b>Line Official : @minerva-th</b>
              </Typography>
            </CardContent>
          </Paper>
        </Grid>
      )}
    </Grid>
  )
}

export default PrivacyNotice
