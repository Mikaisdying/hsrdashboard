import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons'
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components'
import { Divider, Space, Tabs, message, theme } from 'antd'
import type { CSSProperties } from 'react'
import { useState } from 'react'

type LoginType = 'phone' | 'account'

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
}

const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('phone')
  const { token } = theme.useToken()

  return (
    <ProConfigProvider dark>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'white',
        }}
      >
        <LoginFormPage
          backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
          logo="https://github.githubassets.com/favicons/favicon.png"
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          title="Github"
          containerStyle={{
            backgroundColor: 'rgba(0, 0, 0,0.65)',
            backdropFilter: 'blur(4px)',
          }}
          subTitle="The world's largest code hosting platform"
          actions={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Divider plain>
                <span
                  style={{
                    color: token.colorTextPlaceholder,
                    fontWeight: 'normal',
                    fontSize: 14,
                  }}
                >
                  Other login methods
                </span>
              </Divider>
              <Space align="center" size={24}>
                {[
                  {
                    icon: <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />,
                    key: 'alipay',
                  },
                  {
                    icon: <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />,
                    key: 'taobao',
                  },
                  {
                    icon: <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />,
                    key: 'weibo',
                  },
                ].map(({ icon, key }) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      height: 40,
                      width: 40,
                      border: '1px solid ' + token.colorPrimaryBorder,
                      borderRadius: '50%',
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </Space>
            </div>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'Account Password Login'} />
            <Tabs.TabPane key={'phone'} tab={'Phone Number Login'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'Username: admin or user'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your username!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'Password: ant.design'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password!',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <MobileOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                name="mobile"
                placeholder={'Phone number'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your phone number!',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: 'Invalid phone number format!',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'Please enter the verification code'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} Get verification code`
                  }
                  return 'Get verification code'
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the verification code!',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('Verification code sent successfully! The code is: 1234')
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              Auto login
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              Forgot password
            </a>
          </div>
        </LoginFormPage>
      </div>
    </ProConfigProvider>
  )
}

export default Login
