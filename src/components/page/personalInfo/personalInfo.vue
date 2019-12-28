<template>
  <div class="personInfo-contain">
    <div class="contain">
      <!-- left内容 -->
      <div class="contain-left">
        <!-- 头像 -->
        <div class="head">
          <div class="head-con">
            <img v-if="userInfo.portrait" :src="userInfo.portrait" alt>
            <img v-else src="@/assets/image/head.png" alt>
            <!-- <img class="img2" src="@/assets/image/changehead.png" > -->
            <p>{{userInfo.mobile}}</p>
          </div>
        </div>
        <!-- 左边菜单栏 -->
        <el-menu class="el-menu-style" select="cli" active-text-color="#303133">
          <el-menu-item @click="infoShow" :class="flag == 1 ? 'active' : ''">基本信息</el-menu-item>
          <el-menu-item @click="OrderShow" :class="flag == 2? 'active' : ''">我的订单</el-menu-item>
          <el-menu-item @click="vipcenterShow" :class="flag== 3? 'active' : ''">会员中心</el-menu-item>
          <!-- <el-menu-item @click="messageCenter" :class="flag== 6? 'active' : ''">消息中心</el-menu-item> -->
          <el-menu-item @click="messageCenter"  :class="flag == 6? 'active' : ''">消息中心</el-menu-item>
          <el-menu-item @click="questionShow" class="menu4" :class="flag == 4? 'active' : ''">常见问题</el-menu-item>
        </el-menu>
      </div>
      <!-- right内容 -->
      <div class="contain-right">
        <!-- 基本信息 -->
        <div class="infoShow" v-if="flag == 1">
          <p class="info-title-p">基本信息</p>
          <div class="info-contain">
            <div class="info-main2">
              <p>
                <label>您的手机号:</label>
                <span>{{userInfo.mobile}}</span>
              </p>
              <p>
                <label>您的姓名:</label>
                <span>{{userInfo.realname}}</span>
              </p>
              <p>
                <label>您孩子的姓名:</label>
                <span>{{userInfo.student.realname}}</span>
              </p>
              <p>
                <label>您孩子的性别:</label>
                <span v-if="userInfo.student.sex == 0">女</span>
                <span v-if="userInfo.student.sex == 1">男</span>
              </p>
              <p>
                <label>您孩子所在的学校:</label>
                <span>{{userInfo.student.schoolName}}</span>
              </p>
              <p>
                <label>您孩子的年级:</label>
                <span>{{GrandList[userInfo.student.gradeCode]}}</span>
              </p>
              <!-- 省回显 -->
               <!-- <p>
                <label>省份:</label>
                <span>{{userInfo.student.provinceId}}</span>
              </p> -->
              <!-- 文理科 -->
              <p v-if="userInfo.student.artType &&  userInfo.student.artType != '0'">
                <label>文理科:</label>
                <span v-if="userInfo.student.artType == '1'">文科</span>
                <span v-if="userInfo.student.artType == '2'">理科</span>
              </p>
              <p>
                <label>是否为独生子女:</label>
                <span v-if="userInfo.student.isSingle == 0">否</span>
                <span v-if="userInfo.student.isSingle == 1">是</span>
              </p>
              <p>
                <label>您与孩子的关系:</label>
                <span v-if="userInfo.relationType == 0">母亲</span>
                <span v-if="userInfo.relationType == 1">父亲</span>
                <span v-if="userInfo.relationType == 2">其它亲属</span>
              </p>
            </div>
            <p class="change-info">
              <el-button class="el-Button" @click="changeInfo">修改信息</el-button>
            </p>
          </div>
        </div>
        <!-- 我的订单 -->
        <div class="myOrder" v-if="flag == 2">
          <p class="title-info">我的订单</p>
          <div class="order-tabel">
            <div class="order-tabel-H">
              <el-table
                v-if="orderData.length != 0"
                :data="orderData"
                border
                style="width: 904px;margin:0 auto;marginTop:30px"
                :header-cell-style="{'background':'#f7f8f9'}"
              >
                <el-table-column label="订单详情" min-width="302" align="center">
                  <template slot-scope="scope">
                    <div class="order-detail">
                      <p class="order-time">
                        <span>{{dataParse(scope.row.createTime)}}</span>
                        <br>
                        <span>订单号: {{scope.row.orderId}}</span>
                      </p>
                      <div class="order-img">
                        <img v-if="scope.row.liveCoverUrl" :src="scope.row.liveCoverUrl">
                        <img v-else src="@/assets/image/orderpic.png">
                        <span>{{scope.row.liveCourseName}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <!-- 支付金额 -->
                <el-table-column prop="price" label="金额" min-width="80" align="center">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.price}}</span>
                  </template>
                </el-table-column>
                <!-- 商品类型 -->
                <el-table-column prop="liveCourseType" label="商品类型" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.liveCourseType == 3">测评</span>
                    <span v-if="scope.row.liveCourseType == 4">专家咨询</span>
                  </template>
                </el-table-column>
                <!-- 支付方式 -->
                <el-table-column prop="payType" label="支付方式" align="center" min-width="100">
                  <template slot-scope="scope">
                    <!-- <span v-if="scope.row.payType == 0">支付宝</span>
                    <span v-if="scope.row.payType == 1">微信</span>-->
                    <span>{{scope.row.payMode}}</span>
                  </template>
                </el-table-column>
                <!-- 订单状态 -->
                <el-table-column prop="status " label="订单状态" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">待支付</span>
                    <span v-if="scope.row.status == 2">已完成</span>
                    <span v-if="scope.row.status == 3">已取消</span>
                    <span v-if="scope.row.status == 10">售后处理中</span>
                    <span v-if="scope.row.status == 11">售后结束</span>
                  </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" align="center" min-width="220" class="caozuo">
                  <template slot-scope="scope">
                    <p v-if="scope.row.status == 2">
                      <span @click="seeDetails(scope.row)" class="seedetail">查看</span>
                      <br>
                      <span
                        @click="goRefund(scope.row)"
                        class="seedetail"
                        v-if="scope.row.isRefund && scope.row.refunded"
                      >申请退费</span>
                    </p>
                    <p v-if="scope.row.status == 10">
                      <span @click="seeDetails(scope.row)" class="seedetail">查看</span>
                      <br>
                      <span @click="updateRefund(scope.row)" class="seedetail">取消申请</span>
                    </p>
                    <p v-if="scope.row.status == 11">
                      <span @click="seeDetails(scope.row)" class="seedetail">查看</span>
                    </p>
                    <p v-if="scope.row.status == 1">
                      <!-- <el-button type="text" @click="orderCancel(scope.row)" class="cancelOrder">取消订单</el-button> -->
                      <span @click="orderCancel(scope.row)" class="cancelOrder">
                        <span>取消订单</span>
                      </span>
                      <!-- <p> -->
                      <el-button
                        class="el-button-buy"
                        style="background:#c80032;color:#fff;marginRight:3px;"
                        @click="continuePay(scope.row)"
                      >继续支付</el-button>
                    </p>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="endTime" label="到期时间" align="center" width="70"></el-table-column> -->
              </el-table>
              <div v-else style="textAlign:center">
                <img src="../../../../static/img/bookCollege/zwsj.png" alt style="marginTop:100px">
                <p>暂无数据</p>
              </div>
              <!-- 查看订单详情弹框 -->
              <el-dialog title="订单详情" :visible.sync="lookOrderInfo" class="lookOrder">
                <p class="kuang"></p>
                <div class="lookOrder-con1">
                  <p>
                    <label>订单编号</label>
                    <span>{{lookOrderData.orderId}}</span>
                  </p>
                  <p class="look-con-p2">
                    <label>订单状态</label>
                    <span v-if="lookOrderData.status == 1" style="color:#c80032">待支付</span>
                    <span v-if="lookOrderData.status == 2" style="color:#3ebce5">已完成</span>
                    <span v-if="lookOrderData.status == 3">已取消</span>
                    <span v-if="lookOrderData.status == 10">售后处理中</span>
                    <span v-if="lookOrderData.status == 11">售后结束</span>
                  </p>
                  <p>
                    <label>下单时间</label>
                    <span>{{dataParse(lookOrderData.createTime)}}</span>
                  </p>
                </div>
                <p class="kuang"></p>
                <div class="lookOrder-con1">
                  <p>
                    <label>商品名称</label>
                    <span>{{lookOrderData.liveCourseName}}</span>
                  </p>
                  <p class="look-con-p2">
                    <label>商品类型</label>
                    <span v-if="lookOrderData.liveCourseType == 3">测评</span>
                    <span v-if="lookOrderData.liveCourseType == 4">专家咨询</span>
                  </p>
                  <p>
                    <label>商品价格</label>
                    <span
                      v-if="lookOrderData.orderPrice"
                      class="price-color"
                    >￥{{lookOrderData.orderPrice }}</span>
                  </p>
                </div>
                <p class="kuang"></p>
                <div class="lookOrder-con1 lookOrder-con2">
                  <p>
                    <label>支付渠道</label>
                    <span>{{lookOrderData.payMode}}</span>
                  </p>
                  <p>
                    <label>支付时间</label>
                    <span>{{dataParse(lookOrderData.updateTime)}}</span>
                  </p>
                  <p>
                    <label>优惠金额</label>
                    <span
                      v-if="lookOrderData.couponFaceValue"
                      class="price-color"
                    >￥{{lookOrderData.couponFaceValue}}</span>
                    <span v-else class="price-color">0</span>
                  </p>
                  <p>
                    <label>实付金额</label>
                    <span v-if="lookOrderData.price" class="price-color">￥{{lookOrderData.price}}</span>
                    <span v-else class="price-color">0</span>
                  </p>
                  <p v-if="lookOrderData.refundPrice">
                    <label>退费金额</label>
                    <span class="price-color">￥{{lookOrderData.refundPrice}}</span>
                  </p>
                </div>
              </el-dialog>
            </div>
            <!-- 分页 -->
            <div class="setPage">
              <el-pagination
                @size-change="SizeChange"
                @current-change="CurrentChange"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>

        <!-- 会员中心 -->
        <div class="vip-contain" v-if="flag == 3">
          <p class="title-info">
            <span class="title-info-child1">会员中心</span>
            <span class="title-info-child2" @click="buyRecode">会员购买记录</span>
            <el-button class="title-info-child3" @click="goVipCenter">+购买会员</el-button>
          </p>
          <!-- 会员购买记录弹框 -->
          <div class="lookVipRecord">
            <div class="vip-table-H">
              <el-dialog title-info="收货地址" :visible.sync="dialogTableVisible">
                <div class="tableBox">
                  <el-table
                    id="table"
                    :data="tableDataLook"
                    border
                    :header-cell-style="{'background':'#f7f8f9'}"
                  >
                    <!--:summary-method="getSummaries" if-summary -->
                    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                    <!-- <el-table-column prop="payUserName" label="会员名称" min-width="80" align="center"></el-table-column>
                    <el-table-column prop="code" label="交易单号" align="center" min-width="160"></el-table-column>-->
                    <el-table-column
                      prop="liveCourseName"
                      label="购买内容"
                      align="center"
                      min-width="80"
                    ></el-table-column>
                    <el-table-column prop="createTime" label="购买时间" align="center" min-width="80">
                      <template slot-scope="scope">
                        <span>{{dataParse(scope.row.createTime)}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column prop="money" label="购买金额（元）" align="center" min-width="40"></el-table-column>
                  </el-table>
                </div>
                <el-pagination
                  @size-change="handleSizeChangeLook"
                  @current-change="handleCurrentChangeLook"
                  :current-page="currentPageLook"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="currentSizeLook"
                  layout="total,  prev, pager, next, jumper"
                  :total="totalLook"
                ></el-pagination>
              </el-dialog>
            </div>

            <!-- 列表 -->
            <el-table
              v-if="vipData.length != 0"
              id="table"
              :data="vipData"
              :span-method="vipDataMethod"
              border
              style="width: 890px;margin: 0 auto;marginTop:30px;"
              :header-cell-style="{'background':'#f7f8f9'}"
            >
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="gradeName" label="年级" min-width="80" align="center"></el-table-column>
              <el-table-column prop="subjectName" label="学科" align="center" min-width="80"></el-table-column>
              <el-table-column prop="endTime" label="到期时间" align="center" min-width="130">
                <template slot-scope="scope">
                  <span>{{dataParse(scope.row.endTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="会员状态" align="center" min-width="130"></el-table-column>
              <el-table-column prop="memberDesc" label="会员权益" align="center" min-width="260"></el-table-column>
              <el-table-column label="操作" align="center" min-width="80">
                <template slot-scope="scope">
                  <span style="color:#c80032;cursor: pointer;"  v-if="scope.row.vipType == 20" @click="checkprotocol(scope.row)">查看</span>
                  <span style="color:#c80032;cursor: pointer;" @click="renew(scope.row)" v-else>续费</span>
                </template>
              </el-table-column>
            </el-table>
            <div v-else style="textAlign:center">
              <img src="../../../../static/img/bookCollege/zwsj.png" alt style="marginTop:100px">
              <p>暂无数据</p>
            </div>
          </div>
          <!-- 分页 -->
          <div class="setPage">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="currentSize"
              layout="total,  prev, pager, next, jumper"
              :total="totalVipList"
            ></el-pagination>
          </div>
        </div>
        <!-- 常见问题 -->
        <div class="question2" v-if="flag == 4">
          <p class="title-info">常见问题</p>
          <!-- 支付问题 -->
          <div class="nav-question2">支付问题</div>
          <div class="nav-contain">
            <div class="main2">
              <p>所需支付金额超过了银行支付限额</p>
              <p>您可以到银行柜台或登录网上银行提高上限额度，即能轻松支付。</p>
            </div>
            <div class="main2">
              <p>支付宝或网银页面显示错误或者空白</p>
              <p>有些网银对浏览器兼容性有一定要求，导致无法正常支付，若因浏览器造成支付失败，建议您使用IE浏览器进行支付操作。</p>
            </div>
            <div class="main2">
              <p>网上银行已扣款，订单仍显示“未付款”</p>
              <p>可能由于银行的数据传输有滞后性，请不要担心，稍后刷新页面查看。</p>
            </div>
          </div>

          <!-- 退款问题 -->
          <div class="nav-question2">退款问题</div>
          <div class="nav-contain">
            <div class="main2">
              <p>测评商品不能申请退款</p>
              <p>测评商品只有在未测评之前，才可以申请退款。申请退款需经客服审核，审核通过后，款项会在15个工作日内返回支付账户。</p>
            </div>
            <div class="main2">
              <p>提分行动不能申请退款</p>
              <p>只有测评商品和1对1咨询服务商品才可以申请退款。</p>
            </div>
            <div class="main2">
              <p>使用兑换码可以申请退款吗？</p>
              <p>使用兑换码可以申请退款，审核通过后，兑换码可以再次使用。</p>
            </div>
          </div>

          <!-- 使用问题 -->
          <div class="nav-question2">使用问题</div>
          <div class="nav-contain">
            <div class="main2">
              <p>提分行动到期后，还可以看提分行动方案吗？</p>
              <p>提分行动只要购买过，已生成的提分行动方案可以永久查看。</p>
            </div>
            <div class="main2">
              <p>测评一份试卷后，还可以再次测同一份试卷吗？</p>
              <p>不可以，每个商品只能测评一次。如果您想再次测评，可以购买另一份适合您的测评商品。</p>
            </div>
          </div>
        </div>
        <!-- 修改信息 -->
        <div class="infoShow submitInfo" v-if="flag == 5">
          <p class="info-title-p">修改信息</p>
          <div class="info-contain">
            <div class="info-main2">
              <p>
                <label>您的手机号:</label>
                <span>{{userInfo.mobile}}</span>
              </p>
              <p>
                <label>
                  <span class="label-red">*</span> 您的姓名:
                </label>
                <el-input style="width:280px" v-model="userInfo.realname"></el-input>
              </p>
              <p>
                <label>
                  <span class="label-red">*</span> 您孩子的姓名:
                </label>
                <el-input style="width:280px" v-model="userInfo.student.realname"></el-input>
              </p>
              <p>
                <label>
                  <span class="label-red">*</span> 您孩子的性别:
                </label>
                <el-radio
                  v-model="userInfo.student.sex"
                  :label="1"
                  class="sex"
                  text-color="#c80032"
                >男</el-radio>
                <el-radio
                  v-model="userInfo.student.sex"
                  :label="0"
                  class="sex info-main2-sex"
                  text-color="#c80032"
                >女</el-radio>
              </p>
              <p>
                <label>您孩子所在的学校:</label>
                <el-select
                  v-model="province"
                  placeholder="省"
                  class="province"
                  @change="getProId"
                  value-key="areaId"
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.areaId"
                    :label="item.areaName"
                    :value="item"
                  >{{item.areaName}}</el-option>
                </el-select>
                <el-select
                  v-model="city"
                  placeholder="市/区"
                  class="citys"
                  @change="getCityId"
                  value-key="areaId"
                >
                  <el-option
                    v-for="item in citys"
                    :key="item.areaId"
                    :label="item.areaName"
                    :value="item"
                  >{{item.areaName}}</el-option>
                </el-select>
                <el-select
                  v-model="county"
                  placeholder="区/县"
                  class="countyId"
                  @change="getCountId"
                  value-key="areaId"
                >
                  <el-option
                    v-for="item in countys"
                    :key="item.areaId"
                    :label="item.areaName"
                    :value="item"
                  >{{item.areaName}}</el-option>
                </el-select>
                <el-select
                  v-model="schoolArr"
                  placeholder="学校"
                  class="school"
                  @change="changeSchool"
                  value-key="schoolName"
                >
                  <el-option
                    v-for="item in schools"
                    :key="item.schoolId"
                    :label="item.schoolName"
                    :value="item"
                  >{{item.schoolName}}</el-option>
                </el-select>
              </p>
              <!-- 孩子文理科 -->
              <p v-if="isShowArt">
                <label>
                  <span class="label-red">*</span> 文理科:
                </label>
                <el-select v-model="userInfo.student.artType" placeholder="文理科" class="grade">
                  <el-option
                    v-for="item in artList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </p>
              <p>
                <label>
                  <span class="label-red">*</span> 您孩子的年级:
                </label>
                <el-select v-model="userInfo.student.gradeCode" placeholder="请选择年级" class="grade">
                  <el-option
                    v-for="item in gradeDataList"
                    :key="item.value"
                    :label="item.gradeName"
                    :value="item.gradeCode"
                  ></el-option>
                </el-select>
              </p>
              <p>
                <label>
                  <span class="label-red">*</span> 是否为独生子女:
                </label>
                <el-radio
                  v-model="userInfo.student.isSingle"
                  :label="1"
                  class="sex"
                  text-color="#c80032"
                >是</el-radio>
                <el-radio
                  v-model="userInfo.student.isSingle"
                  :label="0"
                  class="sex info-main2-sex"
                  text-color="#c80032"
                >否</el-radio>
              </p>
              <p>
                <label>
                  <span class="label-red">*</span> 您与孩子的关系:
                </label>
                <el-select v-model="userInfo.relationType" placeholder="请选择" class="relationship">
                  <el-option value="0" label="母亲">母亲</el-option>
                  <el-option value="1" label="父亲">父亲</el-option>
                  <el-option value="2" label="其它亲属">其它亲属</el-option>
                </el-select>
              </p>
            </div>
            <p class="change-info">
              <el-button class="el-Button" @click="submitInfo">提交</el-button>
            </p>
          </div>
        </div>
        <!-- 消息中心 -->
        <div v-if="flag == 6">
            <message-list></message-list>
        </div>
      </div>
    </div>


    <!-- 会员中心查看 -->
    <el-dialog
    class="see"
      title="提分承保服务协议"
      :visible.sync="dialogVisible"
      width="50%">
      <div>
        <el-row :gutter="20" class="titleMargin">
          <el-col :span="8">
            <span>手机号:</span>
            <span>{{checkprotocolInfo.userMobile}}</span>
          </el-col>
          <el-col :span="8">
            <span>购买时间:</span>
            <span>{{dataParse(checkprotocolInfo.createTime)}}</span></el-col>
          <el-col :span="8">
            <span>保单号码:</span>
            <span>PRC0011300013844</span></el-col>
        </el-row>
        <el-row :gutter="20" class="titleMargin">
          <el-col :span="8">
            <span>承保学科:</span>
            <span>{{checkprotocolInfo.gradeName + checkprotocolInfo.subjectName}}</span></el-col>
          <el-col :span="8">
            <span>承保分数:</span>
            <span>{{predictedgrade}}</span></el-col>
          <el-col :span="8">
            <span>批单号码:</span>
            <span>PRC0011300013844</span>
          </el-col>
        </el-row>
        <el-row class="titleMargin">
            <span>测评试卷:</span>
            <span>{{checkprotocolInfo.paperName}}</span>
        </el-row>
      </div>
       <div :style="{padding: '0 10px'}">
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的用户： </h3>
        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎您选择北京易教空间教育科技股份有限公司（以下简称“易教空间”）的提分承保产品及服务，在购买和支付前，请您务必仔细阅读并确认同意本协议全部内容。</h3>
        
        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、确认和签署本协议</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.您在完成注册程序及购买程序过程中点击“我同意”按钮即表示您已仔细阅读并完全接受《易教空间用户注册使用协议》，以及本协议的全部条款和条件。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.易教空间郑重提醒您注意本协议中的全部条款，请您仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读并签署本协议。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.本协议中“提分承保产品及服务”，是易教空间联合天安财产保险股份有限公司北京分公司（以下简称“天安保险”）针对高考数学、高考语文两科，为用户推出的“提分承保服务”，用户在购买并参与提分承保产品及服务后，如当年高考成绩未能达到测评报告预测的高考最低达标分数值，天安保险将根据本协议服务条款通过易教空间退还用户相应的费用。</p>
        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、相关名词及解释</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 初始测评分数：是您购买易教空间提分承保产品及服务前，完成定位卷所得的测评成绩。您务必注意，无论您完成了多少次测评，只有当您完成定位卷所得的测评成绩，方可视为您的初始测评分数。此分数将作为易教空间为您提供承保分数的依据。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 初始测评报告：是您购买易教空间提分承保产品及服务前，完成定位卷所得的成绩分析报告。您务必注意，只有当您完成定位卷后所得出的测评报告，方可视为您的初始测评报告。此报告将作为易教空间为您制定系统化的提分承保方案的依据。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 承保分数：是以您初始测评分数为依据，由易教空间为您出具的初始测评报告所预测的您高考最低达标分数值。若您最终高考分数未达到此最低达标分数值，则您可按照本协议条款获得相应的理赔金额。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 承诺提升分数：是您的承保分数与您的初始测评分数相减之差。</p>
        
        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、收费标准及支付</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 易教空间提分承保产品及服务所列明的标价，均按单人单科计价计算，即4980元/人/科。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 一旦您选择购买此提分承保产品及服务并支付相应款项，即视为您认可该项承保产品及服务标明之价格以及本协议全部条款和条件。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 提分承保产品及服务费用将在您点击购买之日按照其标示价格通过以支付宝、微信支付等第三方代收费的方式由易教空间收取。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 您可通过登录易教空间网站页面，进入“我的订单”项下，免费查询您消费的提分承保产品及服务详情（包括您购买的提分承保产品及服务名称、标示价格、付款状态等）。</p>

        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四、承保方式、理赔标准及承保期限</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.承保方式：自您购买提分承保产品及服务之后，如您2020年高考成绩未达到测评报告预测的高考最低达标分数值，天安保险将通过易教空间向您支付提分承保产品及服务的保险赔偿金</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.具体理赔金额计算方式如下：[承诺提升分数-（您最终高考分数-您初始测评分数）]/承诺提升分数*2400元。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.具体理赔金额计算方式如下：[承诺提升分数-（您最终高考分数-您初始测评分数）]/承诺提升分数*2400元。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示例：您测评报告的初始测评分数为60分，承保分数为90分，则承诺提升分数为30分，若您最终高考分数为80分，实际提升了20分，您的赔偿限额固定为2400元（以“N”指代），则您得到的具体理赔金额为:理赔金额=[30-（80-60）]/30*N</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.承保期限：自您购买易教空间提分承保服务及产品之日起，您享受的承保期限为自您缴纳学费次日0时起至2020年6月11日24时止。凡在承保期限之外购买的提分承保产品及服务，则不再享受本协议所约定的提分承保服务。</p>

        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;五、用户权利限制</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 自您购买提分承保产品及服务之日起，易教空间将根据您的初始测评报告结果为您制定系统的提分承保方案，您必须严格按照此承保方案完成您的学习任务。若您在提分承保服务期限届满前，未完成的学习任务量超过易教空间提分承保方案总体任务量的15%（含15%），您将不能获得本协议服务条款约定的理赔。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本条规定的“未完成”是指在提分承保期限内，您未严格按照易教空间为您制定的提分承保方案完成您的学习任务，包括但不限于：</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）.您未按照易教空间规定的时间内完成易教空间为您推荐的测评卷；</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）.您未按照易教空间提分承保方案的要求完成“深度解构题、练习题、以及方案反馈等”；</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3).您未按照易教空间提分承保方案的要求下载相应学科的WORD习题完成练习并上传您的学习效果图片等</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 您购买的提分承保产品及服务，所支付的金额均按单人单科计价，仅限您本人使用，不得将您的易教空间账户有偿或无偿提供、转让给任何第三人，并允许他通过您的易教空间账户使用非由其付费购买的提分承保产品及服务。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 未经许可，不得以任何方式对提分承保产品及服务或其任何部分进行复制、改编、传播、交易、借用、存储或上传至其他平台供他人使用（不论商业或非商业用途）。凡发生前述行为者，均视为侵权行为，易教空间对此等侵权行为保留采取一切法律救济手段之权利，并可视情形对违约用户采取注销或限制其账户功能、产品及服务使用权限等措施。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 禁止对易教空间用于保护其提分承保产品及服务的任何安全措施技术进行攻克、反向操作、更改、破坏或其他篡改，或协助他人进行上述行为。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. 每一个提分承保产品及服务都有限定的使用有效期，您一旦购买并完成支付即视为认可该使用有效期。如您未在有效期内使用，视为自动放弃，易教空间概不退款。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6. 非因法定原因，您在任何情形下无权要求易教空间退回或返还您已经支付的购买款项。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7. 您选择购买提分承保产品及服务并支付相应款项后，如发生使用行为（包括但不限于对相关产品课件或其任何部分进行下载等），您无权要求易教空间退回或返还您已经支付的购买款项。</p>

        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;六、风险及责任</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 您应自行负责妥善且正确地保管、使用、维护您在易教空间申请取得的账户及账户密码。并对账户密码采取必要和有效的保密措施。任何使用您注册帐号以及密码的行为视为您本人的行为，并由您为此承担一切相关责任和后果。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 您明确了解并同意，本协议约定的付费方式为代收费运营商托收方式，代收费运营商可通过易教空间查看您提供的相关支付信息。代收费运营商有自己的用户条款和隐私权政策，并自行承担相应的法律责任。除非适用法律有相反的规定，否则易教空间对这些网站和应用程序不承担担保责任或其他任何责任。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 如您（或任何使用您的账户和密码之行为）违反《易教空间用户注册使用协议》及本协议中的内容，易教空间有权在不通知您的情况下立即终止您已购买的所有服务，以及取消您的易教空间账户和使用权限，但不退还任何您已缴纳的收费费用。</p>

        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;七、免责条款</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 鉴于网络服务的特殊性，对于因服务器的死机、网络故障、数据库故障、软件升级、服务器维修、调整、升级等问题，或其他不可控事由，包括但不限于政府行为、自然灾害、黑客攻击等造成的服务中断和对您个人数据及资料造成的损失，易教空间不承担由此对您造成的任何损失或退还任何您已缴纳的服务费用。但易教空间应尽可能及时进行通告并采取相应的补救措施。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 您购买的提分承保产品及服务有效期限中包含解决故障、服务器维修、调整、升级等所需用的合理时间，对上述情况所需用的时间易教空间不予补偿。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 您将个人密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露和其他后果，易教空间不负任何责任。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 在某些罕见情况下，如因政府管制、权利授权等问题致使易教空间平台上提分承保服务及产品无法使用。在这种情况下，易教空间可以根据不同情况用其他产品替换方式补偿而无须退费。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. 您购买的提分承保产品及服务，必须由您本人严格按照易教空间规定的时间节点完成提分承保方案规定的学习任务。每一个阶段的学习任务将按照规定的时间节点进行，如因为您个人原因导致学习任务迟延或者因学习任务量的积压在短时间仓促完成所迟延或积压的学习任务，导致您高考最终分数未能达到最低达标分数的，易教空间不承担任何赔偿责任。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6. 易教空间对任何间接、偶然、特殊及继起的损害不负责任，不予赔偿。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { localData } from "../../../api";
import messageList from "./messsageList.vue"
export default {
  data() {
    return {
      dialogVisible: false,
      checkprotocolInfo: {}, // 查看协议内容
      predictedgrade: '', // 预测分数
      q: 1,
      flag: 2, //菜单切换标记
      orderStatus: 2,
      orderData: [], //订单数据
      lookOrderInfo: false, //订单详情弹框
      lookOrderData: [], //订单弹框信息
      userInfo: {
        student: {
          schoolName: "",
          schoolCode: "",
          isSingle: "",
          realname: "",
          sex: "",
          artType: "0"
        }
      },
      artList: [{ name: "文科", value: "1" }, { name: "理科", value: "2" }],
      isShowArt: true, // 是否选择文理科
      hideArtId: "",

      province: {
        areaId: ""
      },
      city: {
        areaId: ""
      },
      county: {
        areaId: ""
      },
      schoolArr: {
        schoolId: "",
        schoolName: ""
      },
      school: "",
      schoolCode: "",
      grade: "",
      grades: [],
      relationship: "", //与孩子关系
      relationships: [], //关系集合
      provinces: [], //省份
      citys: [], //城市
      countys: [], //县城
      schools: [], //学校
      proId: "", //省份的id
      cityId: "", //市区id
      countyId: "", //县id
      // gradeCode: "",
      // pageNum: 1,
      // pageSize: 10,
      productType: 0,
      subjectCode: 0,
      userId: null,
      userMobile: "",
      userName: "",
      currentPage: 1, //分页
      currentSize: 10, //每页条数

      tableDataLook: [], //查看会员记录数据
      currentPageLook: 1, //分页  查看会员记录
      currentSizeLook: 10, //每页条数
      totalLook: 0,
      dialogTableVisible: false,

      total: 0, //分页总数订单列表
      totalVipList: 0, //会员列表
      spanArr: [], //设置合并行信息数组
      pos: 0, //合并单元格位置
      vipData: [], //会员列表数据
      vipChildData: [], //处理会员数据
      gradeDataList: [] //年级列表
    };
  },
  created() {
    this.flag = this.localData.get("flag") || this.$route.query.state;
    this.getUserInfo();
    this.localFlag();
    this.localData.set("active", 6);
  },
  components:{messageList},
  watch: {
    $route(getFlag, w) {
      this.flag = getFlag.query.state;
      this.userId = localStorage.getItem("token");
      if (this.userId) {
        this.localFlag();
      }
    }
  },
  methods: {
    // 查看协议
    checkprotocol(item) {
      this.dialogVisible = true;
      this.checkprotocolInfo = item;
      const data = {
           "evaluationRecordCode": item.evaluationRecordId
        }
      console.log(item)
      this.$axios
        .post(this.baseURL + "/assessmentReport/createReport", data)
        .then((res) => {
          console.log(res);
          this.checkprotocolInfo.paperName = res.result.paperName;
          this.predictedgrade = (res.result.nceePrediction.minScore + res.result.nceePrediction.baseScore) + '-' + (res.result.nceePrediction.maxScore + res.result.nceePrediction.baseScore);
        })
      // .then((res) => {
      //   console.log(res)
      // })
    },
    // 个人中心展示
    infoShow() {
      this.flag = 1;
      this.localFlag();
    },
    // 订单列表展示
    OrderShow() {
      this.flag = 2;
      this.localFlag();
    },
    // 会员中心展示
    vipcenterShow() {
      this.flag = 3;
      this.localFlag();
    },
    // 跳转到会员中心
    goVipCenter() {
      localStorage.setItem("active", 2);
      this.$store.commit("active", 2);
      this.$router.push({ path: "/vipCenter" });
    },
    // 消息中心
    messageCenter() {
      this.flag = 6;
      this.localFlag();
    },
    // 问题详情展示
    questionShow() {
      this.flag = 4;
      this.localFlag();
    },
    //修改信息
    changeInfo() {
      this.getProvince(); //获取省份列表
      this.getCity();
      this.getCounty();
      this.getSchol();
      this.flag = 5;
      console.log(this.userInfo)
      if (
        this.province.areaId == "110000" ||
        this.province.areaId == "120000" ||
        this.userInfo.student.artType == "0"
      ) {
        this.isShowArt = false;
        this.userInfo.student.artType = 0;
      } else if (
        this.province.areaId != "110000" &&
        this.province.areaId != "120000" &&
        this.userInfo.student.artType != "0"
      ) {
        this.isShowArt = true;
        // this.userInfo.student.artType = "";
      }
    },
    localFlag() {
      this.localData.set("flag", this.flag);
      this.userId = localStorage.getItem("token");
      if (this.flag == 2) {
        // debugger
        this.getOrderList();
      } else if (this.flag == 3) {
        this.getVIPLIstData();
      } else if (this.flag == 1) {
        this.getGradeListt();
      }
    },
    // 提交修改信息
    submitInfo() {
      let sendData;
      if (this.schoolArr.schoolId != "") {
        sendData = {
          cityId: this.city.areaId,
          countyId: this.county.areaId,
          gradeCode: this.userInfo.student.gradeCode || "",
          isSingle: this.userInfo.student.isSingle,
          mobile: this.userInfo.mobile,
          provinceId: this.province.areaId,
          realname: this.userInfo.realname,
          relationType: this.userInfo.relationType,
          schoolCode: this.schoolArr.schoolId,
          schoolName: this.schoolArr.schoolName,
          sex: this.userInfo.student.sex,
          studentName: this.userInfo.student.realname || "",
          artType: this.userInfo.student.artType || "0"
        };
      } else {
        sendData = {
          gradeCode: this.userInfo.student.gradeCode || "",
          isSingle: this.userInfo.student.isSingle,
          mobile: this.userInfo.mobile,
          realname: this.userInfo.realname,
          relationType: this.userInfo.relationType,
          sex: this.userInfo.student.sex,
          studentName: this.userInfo.student.realname,
          schoolCode: "",
          provinceId: this.province.areaId,
          countyId: "",
          cityId: "",
          schoolName: "",
          artType: this.userInfo.student.artType || "0"
        };
      }

      console.log(999, sendData);
      console.log(sendData.provinceId,this.province.areaId,sendData.artType)
      let regular = /\s+/g;
      if (sendData.realname == "" || regular.test(sendData.realname)) {
        this.$message("请填写姓名");
      } else if (
        sendData.studentName == "" ||
        regular.test(sendData.studentName)
      ) {
        this.$message("请填写孩子的姓名");
      } else if (sendData.sex === "") {
        this.$message("请选择性别");
      } else if (sendData.gradeCode == "") {
        this.$message("请选择年级");
      } else if (
        this.province.areaId &&
        this.province.areaId != "110000" &&
        this.province.areaId != "120000" &&
        sendData.artType == "0"
      ) {
        this.$message("请选择文理科");
      } else if (sendData.isSingle === "") {
        this.$message("请选择孩子是否为独生子女");
      } else if (sendData.relationType === "") {
        this.$message("请选择与孩子的关系");
      } else {
        this.flag = 1;
        this.$axios
          .post(this.baseURL + "/user/saveOrUpdateEvaluationParent", sendData)
          .then(res => {});
        this.$message({
          type: "success",
          message: "提交成功"
        });
      }
    },
    // 获取用户信息接口
    getUserInfo() {
      this.userId = localStorage.getItem("token");
      let sendData = {
        appKey: null,
        token: null,
        userId: localStorage.getItem("token") || null
      };
      this.$axios
        .post(this.baseURL + "/user/getAssessmentAuthenticatedInfo", sendData)
        .then(res => {
          if (res.code == "000000") {
            this.userInfo = res;
            this.userInfo.student = res.student || [];
            let data = res.student;
            this.userInfo.relationType = res.relationType || null;
            this.province.areaId = res.student.provinceId;
            this.city.areaId = res.student.cityId;
            this.county.areaId = res.student.countyId;
            this.schoolArr.schoolId = res.student.schoolCode;
            this.schoolArr.schoolName = res.student.schoolName;
            this.userInfo.student.schoolCode = res.student.schoolCode;
          }
        });
    },
    // 获取年级列表
    getGradeListt() {
      this.$axios.post(this.baseURL + "/grade/getGrades", {}).then(res => {
        this.gradeDataList = res.grades;
      });
    },
    // 获取省接口
    getProvince() {
      this.$axios
        .post(this.areas + "assessment/area/getAreas", {})
        .then(res => {
          if (res.code == "000000") {
            this.provinces = res.areas;
            // this.userInfo.student.provinceId = res.areas.areaName;
          }
        });
    },
    // 选择省份
    getProId(i) {
      // console.log(888888, i);
      if (i.areaId == "110000" || i.areaId == "120000") {
        this.isShowArt = false;
        this.userInfo.student.artType = "0";
      } else {
        this.isShowArt = true;
        this.userInfo.student.artType = "";
      }
      if (this.proId != i.areaId) {
        this.province = i;
        this.province.areaId = i.areaId;
        this.userInfo.student.schoolName = "";

        this.schoolArr.schoolName = "";
        this.schoolArr = {};
        this.schoolArr.schoolId = "";
        this.proId = i.areaId;
        this.citys = [];
        this.countys = [];
        this.city = "";
        this.county = "";
        this.schools = [];
        this.school = "";
        this.getCity(); //获取市区列表
      }
    },

    //获取市区列表
    getCity() {
      this.$axios
        .post(this.areas + "assessment/area/getAreas", {
          parentId: this.proId || this.userInfo.student.provinceId || ""
        })
        .then(res => {
          if (res.code == "000000") {
            this.citys = res.areas;
          }
        });
    },
    // 选择市区
    getCityId(i) {
      if (this.cityId != i.areaId) {
        this.cityId = i;
        this.city = i;
        this.city.areaId = i.areaId;
        this.userInfo.student.schoolName = "";
        this.schoolArr.schoolName = "";
        this.schoolArr = {};
        this.schoolArr.schoolId = "";
        this.countys = [];
        this.county = "";
        this.schools = [];
        this.school = "";
        this.getCounty(); //获取市区列表
      }
    },

    //获取县城列表
    getCounty() {
      this.$axios
        .post(this.areas + "assessment/area/getAreas", {
          parentId: this.cityId.areaId || this.userInfo.student.cityId || ""
        })
        .then(res => {
          if (res.code == "000000") {
            this.countys = res.areas;
          }
        });
    },
    // 选择县
    getCountId(i) {
      if (this.countyId != i.areaId) {
        this.county = i;
        this.county.areaId = i.areaId;
        this.userInfo.student.schoolName = "";
        this.schoolArr.schoolName = "";
        this.schoolArr = {};
        this.schoolArr.schoolId = "";
        this.schools = [];
        this.school = "";
        this.countyId = i.areaId;
        this.getSchol(); //获取学校列表
      }
    },
    // 获取学校列表
    getSchol() {
      this.$axios
        .post(this.areas + "assessment/school/getSchools", {
          areaId: this.countyId || this.userInfo.student.countyId
        })
        .then(res => {
          if (res.code == "000000") {
            this.schools = res.schools;
          }
        });
    },
    // 选择学校
    changeSchool(i) {
      this.schoolArr = i;
      this.schoolArr.schoolId = i.schoolId;
      this.schoolArr.schoolName = i.schoolName;
      this.userInfo.student.schoolName = i.schoolName;
    },

    // 获取订单列表接口
    getOrderList() {
      var that = this;
      this.userId = localStorage.getItem("token");
      let sendData = {
        orderId: null,
        pageNum: this.currentPage,
        pageSize: this.currentSize,
        payType: null,
        productType: 3,
        userCode: this.userInfo.userId || this.userId,
        status: null
        // userAccount: this.userInfo.mobile,
        // userAccount: this.userInfo.realname
        // userAccount:"wangkeqing"
      };
      var time = this.value6 || [];
      if (time.length != 0) {
        sendData.createTime = time[0];
        sendData.updateTime = time[1];
      }
      this.$axios
        .post(this.lantianUrl + "agency/getOrderList", sendData)
        .then(({ httpCode, result }) => {
          if (httpCode == "200") {
            this.total = result.total;
            this.orderData = result.list || [];
            that.orderData.forEach(val => {
              val.refunded = true;
            });
          }
        });
    },
    // 查看
    seeDetails(i) {
      this.lookOrderData = i;
      this.lookOrderInfo = true;
    },
    // 取消订单
    orderCancel(i) {
      this.$confirm("是否取消订单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancelOrder-button",
        confirmButtonClass: "is-order-button",
        type: "info"
      })
        .then(() => {
          this.$axios
            .get(this.lantianUrl + "agency/recallOrder?orderId=" + i.orderId)
            .then(res => {
              if (res.httpCode == "200") {
                if (res.result == true) {
                  this.getOrderList();
                } else {
                  this.$message.error({
                    message: "取消订单失败"
                  });
                }
              }
            });

          this.$message({
            type: "success",
            message: "取消订单成功!",
            duration: "1500",
            customClass: "cancelStyle"
          });
        })
        .catch(() => {});
    },
    // 继续支付
    continuePay(i) {
      this.$router.push({
        path: "/paymentPage",
        query: {
          orderId: i.orderId,
          payType: i.payType,
          price: i.price
        }
      });
    },
    //申请退费
    goRefund(val) {
      var that = this;
      var obj = {
        mobile: val.userMobile,
        orderId: val.orderId,
        userId: val.userCode,
        userName: val.userName ? val.userName : val.userMobile
      };
      this.$confirm(
        "\n" +
          "申请退费后会在24小时内审核，通过后会在7-15个工作日内将费用返还至支付账户。如使用兑换码支付，也可在审核通过后再次使用该兑换码",
        "提示",
        {
          confirmButtonText: "申请退费",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .post(
              this.lantianUrl +
                "agency/agencyAssessWorkOrder/saveAgencyAssessWorkOrder",
              obj
            )
            .then(({ httpCode, result }) => {
              if (httpCode == 200) {
                if (result) {
                  that.$set(val, "refunded", false);
                  that.$set(val, "status", "10");
                }
              }
            });
        })
        .catch(() => {
          /* this.$message({
          type: 'info',
          message: '已取消申请退费'
        });*/
        });
    },
    //取消申请
    updateRefund(val) {
      var that = this;
      var data = {
        orderId: val.orderId,
        status: "4" //取消
      };
      this.$axios
        .post(
          this.lantianUrl +
            "agency/agencyAssessWorkOrder/updateAgencyAssessWorkOrder",
          data
        )
        .then(({ httpCode, result }) => {
          if (httpCode == 200) {
            if (result) {
              that.$set(val, "isRefund", true);
              that.$set(val, "status", "2");
              that.$set(val, "refunded", true);
            }
          }
        });
    },
    // 获取会员列表数据接口
    getVIPLIstData() {
      this.spanArr = [];
      this.userId = localStorage.getItem("token");
      let sendData = {
        gradeCode: null,
        // pageNum: this.currentPage,
        // pageSize: this.currentSize,
        productType: 3,
        search: null,
        subjectCode: null,
        userId: this.userInfo.userId || localStorage.getItem("token")
        // userMobile: this.userInfo.mobile,
        // userName: this.userInfo.realname || null
      };

      this.$axios
        .post(this.lantianUrl + "member/getMemberList", sendData)
        .then(res => {
          if (res.httpCode == "200") {
            if (res.result.list.length == 0 || res.result.list == null) {
              localStorage.setItem("active", 2);
              this.$store.commit("active", 2);
              this.$router.push({ path: "/vipCenter" });
            } else {
              this.totalVipList = res.result.list.length || 0;
              let data;
              data = res.result.list;

              for (var i = 0; i < data.length; i = i + 10) {
                this.vipChildData.push(data.slice(i, i + 10));
              }
              this.vipData = this.vipChildData[0];

              this.$nextTick(() => {
                this.getSpanArr(this.vipData);
              });
            }
          }
        });
    },
    // 查看会员记录
    buyRecode() {
      this.dialogTableVisible = true;
      let sendData = {
        pageNum: this.currentPageLook,
        pageSize: this.currentSizeLook,
        payUserCode: this.userInfo.userId,
        productType: 3
        // orderType: 4
      };
      this.$axios
        .post(this.lantianUrl + "agency/getRechargeRecodeList", sendData)
        .then(({ httpCode, result }) => {
          if (httpCode == 200) {
            this.totalLook = result.total || 0;
            this.tableDataLook = result.list || [];
          }
        });
    },
    // 查看会员记录分页
    handleSizeChangeLook(val) {
      this.currentSizeLook = val;
      this.buyRecode();
    },
    handleCurrentChangeLook(val) {
      this.currentPageLook = val;
      this.buyRecode();
    },
    // 续费
    renew(i) {
      localStorage.setItem("active", 2);
      this.$store.commit("active", 2);
      this.$router.push({
        path: "/vipCenter",
        query: { subjectCode: i.subjectCode, gradeCode: i.gradeCode }
      });
    },
    // 分页
    SizeChange(val) {
      this.currentSize = val;
      this.getOrderList();
    },
    CurrentChange(val) {
      this.currentPage = val;
      this.getOrderList();
    },
    // 分页
    handleSizeChange(val) {
      // this.spanArr = [];
      this.currentSize = val;
      // this.getVIPLIstData();
    },
    handleCurrentChange(val) {
      this.spanArr = [];
      this.currentPage = val;
      // this.getVIPLIstData();
      this.vipData = this.vipChildData[val - 1];
      this.getSpanArr(this.vipData);
    },
    //合并单元格
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].gradeName === data[i - 1].gradeName) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    //合并单元格
    vipDataMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  },
  destroyed() {
    this.localData.delete("flag");
  }
};
</script>

<style lang="less">
.see {
  .el-dialog__header {
    text-align: center;
  }
  .titleMargin {
    margin-bottom: 10px;
  }
}
.personInfo-contain {
  min-width: 1200px;
  width: 100%;

  .contain {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    // left样式
    .contain-left {
      margin-top: 30px;
      color: #333;
      font-size: 14px;
      .head {
        width: 210px;
        height: 160px;
        background-color: #fff;
        margin-bottom: 5px;
        .head-con {
          width: 115px;
          height: 115px;
          margin: 0 auto;
          p {
            font-size: 16px;
          }
          img {
            margin-top: 30px;
            margin-left: 20px;
          }
          .img2 {
            float: right;
            margin-top: -31px;
            argin-right: -10px;
          }
        }
      }
      .el-menu-style {
        width: 210px;
        text-align: center;
        .el-menu-item {
          height: 40px;
          line-height: 40px;
          border-bottom: solid #e6e6e6 1px;
        }
        .active {
          border-left: 2px solid #c80032;
          padding-left: 18px !important;
          background-color: #fff;
        }
        .el-menu-item:hover {
          background-color: #eee;
        }
      }
      .el-menu {
        border-right: 0;
      }
      .menu4 {
        border-bottom: 0 !important;
      }
    }
    // right样式
    .contain-right {
      margin-top: 30px;
      width: 960px;
      margin-left: 20px;
      padding-bottom: 20px;
      color: #333;
      background-color: #fff;
      font-size: 14px;
      .infoShow {
        // padding-left: 30px;
        // padding-top: 25px;
        .info-title-p {
          border-bottom: 1px solid #e6e6e6;
          font-size: 14px;
          height: 70px;
          line-height: 70px;
          padding-left: 30px;
        }
        .info-contain {
          padding-left: 30px;
        }
        .label-red {
          color: red;
          position: relative;
          top: 2px;
        }
      }
      .info-main2 {
        padding-top: 30px;
        p {
          margin-bottom: 35px;
        }
        label {
          display: inline-block;
          width: 140px;
          text-align: right;
          margin-right: 30px;
          color: #999;
        }
        .info-main2-sex {
          margin-left: 0 !important;
        }
      }
      // 基本信息
      .change-info {
        width: 900px;
        text-align: center;
        .el-button {
          background: #c80032;
          color: #fff;
          font-size: 14px;
          border: solid 1px #c80032;
        }
      }
      // 我的订单
      .myOrder {
        .title-info {
          border-bottom: #e6e6e6 solid 1px;
          font-size: 14px;
          height: 70px;
          line-height: 70px;
          padding-left: 30px;
        }
        .order-tabel-H {
          min-height: 480px;
          .lookOrder {
            .el-dialog {
              width: 670px;
            }
            // background-color: #fff;
            .el-dialog__header {
              text-align: center;
              font-size: 14px;
              color: #333;
              padding-bottom: 25px;
              // height: 60px;
            }
            .el-dialog__body {
              padding: 0;
            }
            .kuang {
              height: 8px;
              background-color: #f5f5f5;
            }
            .lookOrder-con1 {
              p {
                padding: 0 24px;
                height: 42px;
                line-height: 42px;
                label {
                  color: #999;
                }
                span {
                  color: #333;
                  float: right;
                }
              }
              .look-con-p2 {
                border-top: #e5e5e5 solid 1px;
                border-bottom: #e5e5e5 solid 1px;
              }
            }
            .lookOrder-con2 {
              padding-bottom: 48px;
              p {
                border-bottom: #e5e5e5 solid 1px;
              }
            }
            .price-color {
              color: #c80032 !important;
            }
          }
        }
        .order-detail {
          .order-time {
            color: #333;
            font-size: 12px;
            text-align: left;
            padding-left: 11px;
          }
          .order-img {
            display: flex;
            text-align: left;
            align-items: center;
            margin-top: 10px;
            margin-bottom: 5px;
            img {
              width: 55px;
              height: 55px;
              margin: 0 10px;
            }
            span {
              color: #333;
              font-size: 14px;
            }
          }
        }
        .setPage {
          width: 960px;
          margin-top: 20px;
          text-align: center;
        }
        .seedetail:hover {
          color: #c80032;
          cursor: pointer;
        }
        .cancelOrder {
          display: inline-block;
          width: 90px;
          height: 38px;
          line-height: 38px;
          border-radius: 3px;
          border: solid 1px #d9d9d9;
          cursor: pointer;
        }
        .cancelOrder:hover {
          color: #c80032;
        }
      }
      // 会员中心
      .vip-contain {
        //  title信息
        .title-info {
          border-bottom: #e6e6e6 solid 1px;
          font-size: 14px;
          height: 70px;
          line-height: 70px;
          padding-left: 30px;
          .title-info-child1 {
            color: #333;
            margin-right: 610px;
          }
          .title-info-child2 {
            color: #c80032;
            margin-right: 30px;
            cursor: pointer;
          }
          .title-info-child3 {
            background-color: #c80032;
            color: #fff;
          }
        }
        .setPage {
          width: 960px;
          margin-top: 20px;
          text-align: center;
        }
        // 会员列表
        .lookVipRecord {
          min-height: 480px;
          .el-dialog {
            width: 60%;
          }
          .el-pagination {
            text-align: center;
            margin-top: 20px;
          }
        }
      }
      //常见问题
      .question2 {
        .title-info {
          border-bottom: #e6e6e6 solid 1px;
          font-size: 14px;
          height: 70px;
          line-height: 70px;
          padding-left: 30px;
        }
        .nav-question2 {
          height: 58px;
          margin-top: 35px;
          line-height: 58px;
          padding-left: 40px;
          color: #c80032;
          border-left: solid 3px #c80032;
          background-color: #fcf0f0;
        }
        .nav-contain {
          margin-top: 30px;
          padding-left: 40px;
          .main2 {
            margin-bottom: 30px;
            p:nth-child(1) {
              color: #333;
              margin-bottom: 20px;
            }
            p:nth-child(2) {
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
      // 提交信息
      .submitInfo {
        .sex {
          width: 25px !important;
          text-align: left !important;
        }
        .province,
        .citys,
        .countyId,
        .school,
        .grade,
        .relationship {
          width: 160px;
          margin-right: 23px;
        }
      }
    }
  }
}
.cancelStyle {
  margin-top: 45px;
}
.cancelOrder-button {
  background-color: #fff !important;
}
.cancelOrder-button:hover {
  color: #c80032;
  border: solid 1px #dcdfe6;
}
.is-order-button {
  background-color: #c80032 !important;
  border: 0 !important;
}
.is-order-button:hover {
  background-color: #c80032;
  color: #fff;
}
</style>




