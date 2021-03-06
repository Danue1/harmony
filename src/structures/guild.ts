import { Client } from '../models/client.ts'
import { GuildFeatures, GuildPayload } from '../types/guild.ts'
import { PresenceUpdatePayload } from '../types/gateway.ts'
import { Base } from './base.ts'
import { VoiceState } from './voiceState.ts'
import { RolesManager } from '../managers/roles.ts'
import { GuildChannelsManager } from '../managers/guildChannels.ts'
import { MembersManager } from '../managers/members.ts'
import { EmojisManager } from '../managers/emojis.ts'

export class Guild extends Base {
  id: string
  name?: string
  icon?: string
  iconHash?: string
  splash?: string
  discoverySplash?: string
  owner?: boolean
  ownerID?: string
  permissions?: string
  region?: string
  afkChannelID?: string
  afkTimeout?: number
  widgetEnabled?: boolean
  widgetChannelID?: string
  verificationLevel?: string
  defaultMessageNotifications?: string
  explicitContentFilter?: string
  roles: RolesManager
  emojis: EmojisManager
  features?: GuildFeatures[]
  mfaLevel?: string
  applicationID?: string
  systemChannelID?: string
  systemChannelFlags?: string
  rulesChannelID?: string
  joinedAt?: string
  large?: boolean
  unavailable: boolean
  memberCount?: number
  voiceStates?: VoiceState[]
  members: MembersManager
  channels: GuildChannelsManager
  presences?: PresenceUpdatePayload[]
  maxPresences?: number
  maxMembers?: number
  vanityURLCode?: string
  description?: string
  banner?: string
  premiumTier?: number
  premiumSubscriptionCount?: number
  preferredLocale?: string
  publicUpdatesChannelID?: string
  maxVideoChannelUsers?: number
  approximateNumberCount?: number
  approximatePresenceCount?: number

  constructor (client: Client, data: GuildPayload) {
    super(client, data)
    this.id = data.id
    this.unavailable = data.unavailable
    this.members = new MembersManager(this.client, this)
    this.channels = new GuildChannelsManager(
      this.client,
      this.client.channels,
      this
    )
    this.roles = new RolesManager(this.client, this)
    this.emojis = new EmojisManager(this.client, this)

    if (!this.unavailable) {
      this.name = data.name
      this.icon = data.icon
      this.iconHash = data.icon_hash
      this.splash = data.splash
      this.discoverySplash = data.discovery_splash
      this.owner = data.owner
      this.ownerID = data.owner_id
      this.permissions = data.permissions
      this.region = data.region
      this.afkTimeout = data.afk_timeout
      this.afkChannelID = data.afk_channel_id
      this.widgetEnabled = data.widget_enabled
      this.widgetChannelID = data.widget_channel_id
      this.verificationLevel = data.verification_level
      this.defaultMessageNotifications = data.default_message_notifications
      this.explicitContentFilter = data.explicit_content_filter
      // this.roles = data.roles.map(
      //   v => cache.get('role', v.id) ?? new Role(client, v)
      // )
      // data.roles.forEach(role => {
      //   this.roles.set(role.id, new Role(client, role))
      // })
      // this.emojis = data.emojis.map(
      //   v => cache.get('emoji', v.id) ?? new Emoji(client, v)
      // )
      this.features = data.features
      this.mfaLevel = data.mfa_level
      this.systemChannelID = data.system_channel_id
      this.systemChannelFlags = data.system_channel_flags
      this.rulesChannelID = data.rules_channel_id
      this.joinedAt = data.joined_at
      this.large = data.large
      this.memberCount = data.member_count
      // TODO: Cache in Gateway Event code
      // this.voiceStates = data.voice_states?.map(
      //   v =>
      //     cache.get('voiceState', `${v.guild_id}:${v.user_id}`) ??
      //     new VoiceState(client, v)
      // )
      // this.members = data.members?.map(
      //   v =>
      //     cache.get('member', `${this.id}:${v.user.id}`) ??
      //     new Member(client, v)
      // )
      // this.channels = data.channels?.map(
      //   v => cache.get('channel', v.id) ?? getChannelByType(this.client, v)
      // )
      this.presences = data.presences
      this.maxPresences = data.max_presences
      this.maxMembers = data.max_members
      this.vanityURLCode = data.vanity_url_code
      this.description = data.description
      this.banner = data.banner
      this.premiumTier = data.premium_tier
      this.premiumSubscriptionCount = data.premium_subscription_count
      this.preferredLocale = data.preferred_locale
      this.publicUpdatesChannelID = data.public_updates_channel_id
      this.maxVideoChannelUsers = data.max_video_channel_users
      this.approximateNumberCount = data.approximate_number_count
      this.approximatePresenceCount = data.approximate_presence_count
    }
  }

  protected readFromData (data: GuildPayload): void {
    super.readFromData(data)
    this.id = data.id ?? this.id
    this.unavailable = data.unavailable ?? this.unavailable

    if (!this.unavailable) {
      this.name = data.name ?? this.name
      this.icon = data.icon ?? this.icon
      this.iconHash = data.icon_hash ?? this.iconHash
      this.splash = data.splash ?? this.splash
      this.discoverySplash = data.discovery_splash ?? this.discoverySplash
      this.owner = data.owner ?? this.owner
      this.ownerID = data.owner_id ?? this.ownerID
      this.permissions = data.permissions ?? this.permissions
      this.region = data.region ?? this.region
      this.afkTimeout = data.afk_timeout ?? this.afkTimeout
      this.afkChannelID = data.afk_channel_id ?? this.afkChannelID
      this.widgetEnabled = data.widget_enabled ?? this.widgetEnabled
      this.widgetChannelID = data.widget_channel_id ?? this.widgetChannelID
      this.verificationLevel = data.verification_level ?? this.verificationLevel
      this.defaultMessageNotifications =
        data.default_message_notifications ?? this.defaultMessageNotifications
      this.explicitContentFilter =
        data.explicit_content_filter ?? this.explicitContentFilter
      // this.roles =
      //   data.roles.map(
      //     v => cache.get('role', v.id) ?? new Role(this.client, v)
      //   ) ?? this.roles
      this.features = data.features ?? this.features
      this.mfaLevel = data.mfa_level ?? this.mfaLevel
      this.systemChannelID = data.system_channel_id ?? this.systemChannelID
      this.systemChannelFlags =
        data.system_channel_flags ?? this.systemChannelFlags
      this.rulesChannelID = data.rules_channel_id ?? this.rulesChannelID
      this.joinedAt = data.joined_at ?? this.joinedAt
      this.large = data.large ?? this.large
      this.memberCount = data.member_count ?? this.memberCount
      // this.voiceStates =
      //   data.voice_states?.map(
      //     v =>
      //       cache.get('voiceState', `${v.guild_id}:${v.user_id}`) ??
      //       new VoiceState(this.client, v)
      //   ) ?? this.voiceStates
      // this.members =
      //   data.members?.map(
      //     v =>
      //       cache.get('member', `${this.id}:${v.user.id}`) ??
      //       new Member(this.client, v)
      //   ) ?? this.members
      // this.channels =
      //   data.channels?.map(
      //     v => cache.get('channel', v.id) ?? getChannelByType(this.client, v, this)
      //   ) ?? this.members
      this.presences = data.presences ?? this.presences
      this.maxPresences = data.max_presences ?? this.maxPresences
      this.maxMembers = data.max_members ?? this.maxMembers
      this.vanityURLCode = data.vanity_url_code ?? this.vanityURLCode
      this.description = data.description ?? this.description
      this.banner = data.banner ?? this.banner
      this.premiumTier = data.premium_tier ?? this.premiumTier
      this.premiumSubscriptionCount =
        data.premium_subscription_count ?? this.premiumSubscriptionCount
      this.preferredLocale = data.preferred_locale ?? this.preferredLocale
      this.publicUpdatesChannelID =
        data.public_updates_channel_id ?? this.publicUpdatesChannelID
      this.maxVideoChannelUsers =
        data.max_video_channel_users ?? this.maxVideoChannelUsers
      this.approximateNumberCount =
        data.approximate_number_count ?? this.approximateNumberCount
      this.approximatePresenceCount =
        data.approximate_presence_count ?? this.approximatePresenceCount
    }
  }
}
