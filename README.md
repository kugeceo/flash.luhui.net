---

# 鲁虺 Flash 历史博物馆


鲁虺Flash博物馆 http://flash.luhui.net 鲁虺精品Flash作品陈列馆


![License](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/kugeceo/flash.luhui.net)
![GitHub forks](https://img.shields.io/github/forks/kugeceo/flash.luhui.net)

**鲁虺 Flash 历史博物馆**（鲁虺精品 Flash 作品陈列馆）是一个致力于保存和展示经典 Flash 内容的开源项目，基于 HTML5 和 Rust，通过现代图形 API（如 DirectX 12、WebGPU、Vulkan）在浏览器和桌面环境中重现 Flash 动画、游戏和交互式应用。访问博物馆：[http://flash.luhui.net](http://flash.luhui.net)。

## 项目简介

鲁虺 Flash 历史博物馆旨在通过 Ruffle 模拟器和 wgpu 图形库，复现 Adobe Flash 的辉煌历史，展示精品 Flash 作品（如 Starling 的 2D 游戏和 Away3D 的 3D 场景）。项目支持 AGAL 着色器到 SPIR-V 的转换，提供高性能渲染，适用于教育、娱乐和文化存档。博物馆涵盖 Flash 资讯、教程、源码、工具等内容，让经典 Flash 焕发新生。

### 核心功能

- **精品 Flash 展示**：精选经典 SWF 文件，包括动画、游戏（如《Angry Birds Flash》）和 3D 场景（如《Club Penguin》）。
- **现代渲染支持**：
  - **DirectX 12**：Windows 桌面版通过 wgpu 提供高效渲染，FPS 提升 10-20%，CPU 开销降低 10-20%。
  - **WebGPU**：浏览器支持（Chrome 113+、Safari 17.4+），实验性运行 Stage3D 内容。
  - **Vulkan**：跨平台桌面支持，性能优化。
- **AGAL 转换**：通过 SPIRV-Cross 将 AGAL 着色器转换为 SPIR-V，支持复杂 Stage3D 内容。
- **内容分类**：
  1. **Flash 资讯**：Flash 历史、技术进展和社区动态。
  2. **Flash 软件**：推荐 Flash 播放器和模拟工具。
  3. **Flash 教程**：ActionScript 和 AGAL 开发指南。
  4. **Flash 厂家**：历史 Flash 开发公司和工具介绍。
  5. **Flash 网站**：经典 Flash 网站存档。
  6. **Flash 源码**：开源 ActionScript 和 SWF 示例。
  7. **Flash 品鉴**：精选作品赏析和历史回顾。
  8. **Flash 插件**：浏览器插件和扩展支持。
  9. **Flash 工具**：SWF 解析、转换和调试工具。
  10. **Flash 设计**：Flash 动画和 UI 设计案例。
  11. **Flash 服务**：社区支持和内容存档服务。



## 整站打包下载

源码数据整站打包下载渠道

1. 访问鲁虺软件源码数据测试分享电报群下载 [https://t.me/luhuicode/8282](https://t.me/luhuicode/8282) 文件完整，解压后有41.1 GB (44,134,011,687 字节)。

2. 访问 github下载 [https://github.com/kugeceo/flash.luhui.net](https://github.com/kugeceo/flash.luhui.net)由于文件太多太大目前还未全部传完。

3. 联系作者，硬盘拷贝获取。


## 安装与使用


鲁虺Flash博物馆flashmuseum.gif数据flashmuseum.json修改压缩方法

### 恢复步骤1：强制改后缀提取ZIP中的JSON文件
-将flashmuseum.gif文件后缀名改为`.zip`（例如命名为`flashmuseum.zip`，注意确保系统显示文件后缀，避免变成`flashmuseum.zip.txt`）。

#### 恢复步骤2：解压ZIP文件
- 用解压工具（如WinZip、7-Zip、系统自带解压功能）打开`flashmuseum.zip`；
- 解压后会直接得到`flashmuseum.json`文件，此时该文件就是正常的JSON格式了。


### 在线体验
1. 访问 [http://flash.luhui.net](http://flash.luhui.net)。
2. 浏览分类内容或上传 SWF 文件。
3. 推荐使用支持 WebGPU 的浏览器（Chrome 113+、Safari 17.4+）或 WebGL 2.0。

### 桌面版安装（Windows）
1. **先决条件**：
   - Windows 10/11（支持 DirectX 12 Feature Level 11.0+）。
   - 现代 GPU（如 Nvidia RTX 20 系列、AMD RDNA 2、Intel Arc）。
   - 最新 GPU 驱动（Nvidia 573.52、AMD 570.123.19 或更新）。
   - .NET Framework 4.6.2 或 Microsoft Visual C++ Redistributable（[下载](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)）。
2. **安装步骤**：
   ```bash
   # 克隆仓库
   git clone https://github.com/kugeceo/flash.luhui.net.git
   cd flash.luhui.net
   # 安装 Rust 和 wgpu 依赖
   cargo build --release
   # 运行桌面版（指定 DirectX 12 后端）
   cargo run -- -g dx12
   ```
3. 打开 SWF 文件或浏览博物馆内容。

### 开发环境搭建
1. 安装 [Rust](https://www.rust-lang.org/) 和 [Node.js](https://nodejs.org/)。
2. 安装 wgpu 依赖：
   ```bash
   cargo install wgpu
   ```
3. 构建 WebAssembly（用于浏览器）：
   ```bash
   wasm-pack build --target web
   ```
4. 运行本地服务器：
   ```bash
   npm install
   npm start
   ```

## AGAL 到 SPIR-V 转换
项目通过 SPIRV-Cross 将 AGAL 着色器转换为 SPIR-V，支持 DirectX 12、Vulkan 和 WebGPU 后端。关键转换细节：
- **寄存器映射**：
  - `va`（顶点属性）→ `OpVariable`（`Input`，`Location` 装饰器）。
  - `vc`/`fc`（常量）→ `OpVariable`（`Uniform`，`Binding` 装饰器）。
  - `op`/`oc`（输出）→ `OpVariable`（`Output`，`BuiltIn Position` 或 `Location 0`）。
- **指令映射**：
  - `m44`（矩阵乘法）→ `OpMatrixTimesVector`。
  - `tex`（纹理采样）→ `OpImageSampleImplicitLod`。
  - `sge`/`slt`（条件）→ `OpSelect` 或 `OpBranchConditional`。
- **示例**：
  ```agal
  m44 op, va0, vc0
  mov v0, va1
  tex oc, v0, fs0 <2d, linear, clamp>
  ```
  转换为 SPIR-V（伪代码）：
  ```spirv
  ; 顶点着色器
  %mvpMatrix = OpLoad %mat4 %vc0
  %position = OpLoad %vec4 %va0
  %result = OpMatrixTimesVector %vec4 %mvpMatrix %position
  OpStore %op %result
  %texCoord = OpLoad %vec2 %va1
  OpStore %v0 %texCoord
  ; 片段着色器
  %texCoord = OpLoad %vec2 %v0
  %color = OpImageSampleImplicitLod %vec4 %fs0 %texCoord
  OpStore %oc %color
  ```
- **状态**：
  - 简单 AGAL（如 Starling 的 2D 渲染）完全支持，运行流畅。
  - 复杂 AGAL（如 Away3D 的多光源）需计算着色器支持，预计 2025-2026 年完善。

## 已知问题
- **DirectX 12 稳定性**：部分 AMD GPU（如 Radeon RX 7600）启动缓慢，需更新驱动。
- **复杂 Stage3D 内容**：Away3D 的 3D 场景支持不完整，需计算着色器。
- **硬件兼容性**：需 DirectX 12 兼容 GPU，旧设备需回退到 WebGL。
- **WebGPU 限制**：浏览器需 HTTPS 和 WebGPU 支持，旧浏览器回退到 WebGL。

## 贡献指南
欢迎为鲁虺 Flash 历史博物馆贡献力量！参与方式：
1. Fork 本仓库：
   ```bash
   git clone https://github.com/your-username/flash.luhui.net.git
   ```
2. 创建特性分支：
   ```bash
   git checkout -b feature/your-feature
   ```
3. 提交更改：
   ```bash
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```
4. 创建 Pull Request，描述更改。
5. 优先贡献方向：
   - 优化 AGAL 到 SPIR-V 的转换。
   - 测试 DirectX 12 和 WebGPU 在不同设备上的兼容性。
   - 扩展博物馆内容（如新增 Flash 源码、教程）。

## 联系我们
- **网站**：[http://luhui.net](http://luhui.net)
- **邮箱**：63625244@qq.com
- **微博**：[http://weibo.com/kugeceo](http://weibo.com/kugeceo)
- **问题反馈**：[http://luhui.net/#Contact](http://luhui.net/#Contact)
- **GitHub Issues**：提交 bug 或功能请求。

  

## 捐助打赏作者

手机如何扫码：

![打赏作者](./images/zhifu.png)

① 保存上面二维码图片　② 打开微信、支付宝、手机qq、“扫一扫”　③ 点击右下脚图标　④ 选择刚才保存的图片

感谢每一位捐赠者，我一直在坚持不懈地努力和创新，不断精心打磨产品，并坚持完全免费，我走过的每一步、开发的每一个功能，离不开那些默默支持我的热心用户，
大家的每一份捐赠和建议，都是我做的更好、走的更远最大的支持和动力！感谢大家，感谢有你，与你相遇好幸运！

您的捐赠将会用于：

①  支付服务器、域名费用。
②  开发更丰富的功能，设计更友好的用户界面。
③  保证本站一直免费为大家提供服务。



## 认证许可
本项目采用 MIT 许可证，详情见 [LICENSE](LICENSE) 文件。

## 致谢
- **Ruffle 项目**：提供 Flash 模拟核心。
- **wgpu 社区**：支持 DirectX 12、Vulkan 和 WebGPU。
- **SPIRV-Cross**：实现 AGAL 到 SPIR-V 的转换。
- **Flash 社区**：为经典 Flash 内容的保存和传播提供支持。

---

**鲁虺文化网** © 2004-2025 | 保存 Flash 历史，重现数字经典！

---
